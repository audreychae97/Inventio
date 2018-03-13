var request = new XMLHttpRequest();
function increment(quantityAmount, productID){
    //doc get element by id
    var address = `http://127.0.0.1:3000/inventory/increment/${quantityAmount}/${productID}`;
    request.open('PUT', address, true);
    window.location.reload();

    // request.onload = function () {
    //     if (request.status >= 200 && request.status < 400) {
    //         console.log("inside rthe onload");
    //     } else {
    //      console.log('FUCK');
    //     }
    // }
    request.send();
}
function decrement(quantityAmount, productID){
    //doc get element by id
    var address = `http://127.0.0.1:3000/inventory/decrement/${quantityAmount}/${productID}`;
    request.open('PUT', address, true);
    window.location.reload();
    // request.onload = function () {
    //     if (request.status >= 200 && request.status < 400) {
    //         console.log("inside rthe onload");
    //     } else {
    //      console.log('FUCK');
    //     }
    // }
    request.send();
}
