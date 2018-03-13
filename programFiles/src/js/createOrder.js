var request = new XMLHttpRequest();
function shittyMethod(productID){
    console.log(productID);
    var address = `http://127.0.0.1:3000/createOrder/${productID}`;
    request.open('GET', address, true);

    request.onload = function () {
        console.log("inside the function");
        // Begin accessing JSON data here
        var product = JSON.parse(this.response);
 
        if (request.status >= 200 && request.status < 400) {
            console.log(product.Name);
            console.log(product.Quantity);
            console.log(product.Size);
            console.log(product.Category);
            //Now need to find a way to dynamically populate the table 
        } else {
         console.log('error');
        }
    }

    request.send();
}



// function getClientList(){
//     console.log("inside getClientList");
//     var address = `http://127.0.0.1:3000/createOrder/client`;
//     request.open('GET', address, true);

//     request.onload = function(){
//         console.log("inside inner fcn??");
        
//     }
    
// }


//document.getElementById("demo").innerHTML = obj.name + ", " + obj.age();

//  request.onload = function () {
//        // Begin accessing JSON data here
//        var data = JSON.parse(this.response);
//
//        if (request.status >= 200 && request.status < 400) {
//         data.forEach(product => {
//           console.log(product.Name);
//         });
//        } else {
//         console.log('error');
//        }
//    }
