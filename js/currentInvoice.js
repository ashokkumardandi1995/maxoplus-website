function openInvoice(index){

let invoices =
JSON.parse(localStorage.getItem("maxoInvoices")) || [];

localStorage.setItem(
"currentInvoice",
JSON.stringify(invoices[index])
);

window.location.href="bill.html";

}
