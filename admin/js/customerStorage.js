function saveCustomer(invoice){

let customers =
JSON.parse(localStorage.getItem("maxoCustomers")) || [];

const exists =
customers.find(c =>
c.phone === invoice.customerPhone ||
c.name.toLowerCase() === invoice.customerName.toLowerCase()
);

if(exists){
return;
}

customers.push({

name:invoice.customerName,
phone:invoice.customerPhone,
gst:invoice.customerGST,
address:invoice.customerAddress

});

localStorage.setItem(
"maxoCustomers",
JSON.stringify(customers)
);

}
