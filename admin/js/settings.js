let settings = {};

fetch("../data/settings.json?v=" + Date.now())
.then(res => res.json())
.then(data=>{

    settings = data;

    document.getElementById("invoiceNo").value =
    "INV-" +
    String(settings.lastInvoice).padStart(5,"0");

});
