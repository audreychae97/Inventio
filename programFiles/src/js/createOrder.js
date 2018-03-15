
var request = new XMLHttpRequest();
// List of products in the order . quantity+productID is the name of each of the input tables
var productList = [];


function addToOrder(productID, productName, productSize, productUnit, productRetailPrice) {
    var flag = 0;
    for (i = 0; i < productList.length; i++) {
        if (productList[i] == productID) {
            flag = 1;
        }
    }
    if (flag == 0) {
        productList.push(productID);
        var table = $('#orderTable').DataTable();
        var inputField = '<input type="number" class="form-control" id="quantity' + productID + '" maxlength="10" min = "0" value = "1" style="width:80px">';
        var name = '<td>' + productName + '</td>';
        var size = '<td>' + productSize + ' ' + productUnit + '</td>';
        var retailPrice = '<td>' + '$' + productRetailPrice + '</td>';

        $inputField = $(inputField);
        $name = $(name);
        $size = $(size);
        $retailPrice = $(retailPrice);
        table.row.add([
            inputField, name, size, retailPrice
        ]).draw(false);
    }
    else {
        console.log("ERROR: throw an error: Item " + productName + " with ID " + productID + " was already added..");
    }
}

function submitOrder(SalesPerson, ExpectedDate, StoreID) {
    console.log("Salesperson = " + SalesPerson);
    console.log("ExpectedDate = " + ExpectedDate);
    console.log("StoreID = " + StoreID);
    var OrderID = Math.floor(Math.random() * 900000000) + 100000000;
    var address = `http://127.0.0.1:3000/createOrder/${OrderID}/${SalesPerson}/${ExpectedDate}/${StoreID}`;
    request.open('POST', address, true);
    request.send();

    addProductsToOrder(OrderID);
}

function addProductsToOrder(orderID) {
    for (i = 0; i < productList.length; i++) {
        var curProdID = productList[i];
        var fieldId = 'quantity' + curProdID;
        var quantity = document.getElementById(fieldId).value;
        console.log("quantity = " + quantity);
        wehavenotime(orderID, curProdID, quantity);
        
    
    }
}

function wehavenotime(orderID, productID, quantity){
    var address = `http://127.0.0.1:3000/createOrder/${orderID}/${productID}/${quantity}`;   
        request.open('POST', address, true);
        request.send(); 
}

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
