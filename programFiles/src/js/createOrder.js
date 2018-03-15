
var request = new XMLHttpRequest();
var productList = [];

function shittyMethod(productID) {
    //console.log(productID);
    var address = `http://127.0.0.1:3000/createOrder/${productID}`;
    request.open('GET', address, true);

    request.onload = function () {
        // Begin accessing JSON data here
        var product = JSON.parse(this.response);

        productList.push(product.Name);
        productList.push(product.ProductID);

        if (request.status >= 200 && request.status < 400) {
            for (i = 0; i < productList.length; i += 2) {
                console.log("Product Name: " + productList[i]);
                console.log("Product ID: " + productList[i + 1]);
            }
            console.log("=============================");
            //console.log("Product list: " + productList[0]);
            // console.log(product.Name);
            // console.log(product.Quantity);
            // console.log(product.Size);
            // console.log(product.Category);
        } else {
            console.log('error');
        }
    }

    request.send();
}
function addToOrder(productID, productName, productSize, productUnit, productRetailPrice) {
    var table = $('#orderTable').DataTable();
    var inputField = '<input type="number" class="form-control" name="quantity" maxlength="10" min = "0" value = "1" style="width:80px">';
    var name = '<td>'+productName+'</td>';
    var size = '<td>'+productSize+ ' ' + productUnit+'</td>';
    var retailPrice = '<td>'+productRetailPrice+'</td>';
    
    $inputField = $(inputField);
    $name = $(name);
    $size = $(size);
    $retailPrice = $(retailPrice);
    table.row.add([
        inputField, name, size, retailPrice
    ]).draw(false);
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
