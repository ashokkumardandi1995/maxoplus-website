let invoices = [];

fetch("data/invoices.json?v=" + Date.now())
.then(res => res.json())
.then(data => {

    invoices = data;

    console.log("Invoices Loaded:", invoices);

});
