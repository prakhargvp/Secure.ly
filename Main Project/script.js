function checkEmail(){
    //read email
   
    let email = document.querySelector("#id_email").value;
    
    //Email Validation
    if(!email || email === ""){
        alert("Not entered any Email");
        return;
    }

    //query URL
    let queryURL = "http://localhost:3000/" + email;
    
   
    //request ajax
    fetch(queryURL)
        .then(function (response) {
            //return response
            return response.json();
            alert("1");
        })
        .then(function (result) {
            displayEmailResult(result);
            alert("2");
        })
        .catch(function (error) {
            consone.log(error.message);
            alert("3");
        });
}

function displayEmailResult(result) {
    //hide email modal

    $('#emailModal').madal('hide');

    //get message div
    let msgDiv = document.querySelector("#message");
    //select div result
    let div = document.querySelector("#result");

    if(result.message) {
        //clear contents
        div.innerHTML = "";

        //email not hacked
        //diaplay success alert
        msgDiv.innerHTML = '<div class="alert alert-success alert-dismissible" role="alert"> \
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                               <strong>Good News!</strong> Your Email address is never hacked. \
                            </div>';
    }
    else{
        //email hacked
        //display alert error
        msgDiv.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <strong>Hacked!!</strong> Better Check Yourself, you\'re not looking too good. \
                            </div>';

        //clear contents
        div.innerHTML = "";
        
        //counter
        var i=0;
        //loop through all the objects in result
        result.forEach(function(currentResult) {
            let hackedHTMLDiv = `<div class="jumbotron" id="id"> \
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-4">
                                            <h5>${currentResult.Title}: <small><a target="_blank" href="${currentResult.Domain}">website</a></small></h5>
                                            <h5>Breach Date: <small>${currentResult.BreachDate}</small></h5>
                                            <h5>Added: <small>${currentResult.AddedDate}</small></h5>
                                            <h5>Modified: <small>${currentResult.ModifiedDate}</small></h5>
                                        <div>
                                        <div class="col-xs-12 col-sm-8">
                                            <h5>${currentResult.Name}</h5>
                                            <p>${currentResult.Description}</p>
                                        </div>
                                        <div class="col-xs-12" id="data_id_$(i)">
                                            <h5>Compromised data</h5>
                                        </div>
                                    </div>
                                </div>`;



            $('#result').append(hackedHTMLDiv);


            currentResult.DataClasses.forEach(function(currentDataClass){

                $(`#data_id_$(i)`).append(`<span class="label label-danger danger-label">${currentDataClass}</span>`);
            });


            i++;
        });

        console.log(result);
    }
}