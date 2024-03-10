import axios from "axios";

export const checkoutProductsCart = async (totalPrice, transId) => {
  var params = {
    amt: totalPrice * 133,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: totalPrice * 133,
    pid: transId + "-" + new Date().getTime(),
    scd: "EPAYTEST",
    su: "http://localhost:5173/esewasuccess",
    fu: "http://localhost:5173/esewafail",
  };
  esewaCall(params);
};

const esewaCall = (esewaFormData) => {
  var path = "https://uat.esewa.com.np/epay/main";

  var form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", path);

  for (var key in esewaFormData) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", esewaFormData[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
};
