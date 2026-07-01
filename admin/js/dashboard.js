let invoices =
JSON.parse(localStorage.getItem("maxoInvoices")) || [];

let customers =
JSON.parse(localStorage.getItem("maxoCustomers")) || [];

// Products
fetch("../products.json?v=" + Date.now())
.then(res => res.json())
.then(products => {

document.getElementById("productCount").textContent =
products.length;

});

// Invoice Count
document.getElementById("invoiceCount").textContent =
invoices.length;

// Customer Count
document.getElementById("customerCount").textContent =
customers.length;

// Today's Sales
let today = new Date().toISOString().split("T")[0];

let todaySales = 0;

invoices.forEach(invoice => {

if(invoice.invoiceDate === today){

todaySales += Number(invoice.grandTotal);

}

});

document.getElementById("todaySales").textContent =
"₹ " + todaySales.toFixed(2);