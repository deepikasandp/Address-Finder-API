var url = "https://api.getAddress.io/find/";
const api_key = "";

function displayData(result){
    console.log(result);
    let arr = result.addresses[0].split(",");
    $("p.lead").text(`${arr[0]},${arr[5]},${arr[6]}`);
    $("p.lead").css("color","black");    
    $("p.lead").css("font-weight","bold");
    console.log(arr);
    $("#test_form #address").val(arr[0]);
    $("#test_form #city").val(arr[5]);
    $("#test_form #county").val(arr[6]);
}

function displayError(status, errMessage){    
    $("p.lead").text(`Error: ${status}:${errMessage}`);
    $("p.lead").css("color","red");    
}

function prepareQueryParams(postcode,number){
    let query;    
    query = encodeURIComponent(postcode);
    query += "/";
    query += encodeURIComponent(number);
    //append the api-key to the query parameter
    query += "?api-key=";
    query += api_key;
    return query;
}

function get(postcode, number){
    var xhr = new XMLHttpRequest();    
    //prepare the endpoint url by appending the query parameter
    url += prepareQueryParams(postcode, number);
    console.log(url);
    // open a connect to the endpoint
    xhr.open("GET", url);
    // set the call back function on success and failure
    xhr.onreadystatechange = function()
    {
        if(this.readyState == 4)
        {
            if(this.status == 200) //on Success
            {
                let result = JSON.parse(xhr.response);
                console.log(xhr);
                displayData(result);
            }
            else //on failure
            {   
                //console.log(`Error:${this.status} ${this.statusText}`);
                displayError(this.status,this.statusText);
            }
        }
    }
    // send the request to the endpoint
    xhr.send();
    console.log("Request Sent");
}

function getAddress(form){
    let postcode = form["postcode"].value;
    let number = form["number"].value; 
    var status = false;
    console.log(`Postcode = ${postcode}, Number = ${number}`);
    if(number == "" || postcode == ""){
        $("p.lead, #error").text("Error: Unable to process request - Both inputs are required");
        $("p.lead, #error").css("color","red");
    }
    else{
        $("p.lead, #error").text(" ");
        get(postcode, number);
    }
    return status;
}