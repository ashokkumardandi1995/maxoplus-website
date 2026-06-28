function saveInvoice(invoice){

let invoices =
JSON.parse(localStorage.getItem("maxoInvoices")) || [];

invoices.push(invoice);

localStorage.setItem(
"maxoInvoices",
JSON.stringify(invoices)
);

}
