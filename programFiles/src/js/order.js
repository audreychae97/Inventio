var request = new XMLHttpRequest();

function openModal(orderID){
  var address = `http://127.0.0.1:3000/order/${OrderID}`;
  request.open('GET', address, true);
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
