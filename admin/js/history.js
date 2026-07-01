let invoices =
JSON.parse(localStorage.getItem("maxoInvoices")) || [];

const tbody =
document.getElementById("historyBody");

function loadInvoices(){

tbody.innerHTML = "";

invoices.forEach((invoice,index)=>{

const row =
document.createElement("tr");

row.innerHTML = `

<td>${invoice.invoiceNo}</td>

<td>${invoice.invoiceDate}</td>

<td>${invoice.customerName}</td>

<td>₹ ${invoice.grandTotal}</td>

<td>

<button onclick="viewInvoice(${index})">
View
</button>

<button onclick="deleteInvoice(${index})">
Delete
</button>

</td>

`;

tbody.appendChild(row);

});

}

loadInvoices();
function deleteInvoice(index){

if(!confirm("Delete this invoice?"))
return;

invoices.splice(index,1);

localStorage.setItem(
"maxoInvoices",
JSON.stringify(invoices)
);

loadInvoices();

}
function viewInvoice(index){

openInvoice(index);

}
document
.getElementById("searchInvoice")
.addEventListener("input", searchInvoice);

function searchInvoice(){

const value =
document.getElementById("searchInvoice")
.value.toLowerCase();

tbody.innerHTML = "";

invoices
.filter(invoice =>

invoice.invoiceNo.toLowerCase().includes(value) ||

invoice.customerName.toLowerCase().includes(value)

)

.forEach((invoice,index)=>{

const row =
document.createElement("tr");

row.innerHTML = `

<td>${invoice.invoiceNo}</td>

<td>${invoice.invoiceDate}</td>

<td>${invoice.customerName}</td>

<td>₹ ${invoice.grandTotal}</td>

<td>

<button onclick="viewInvoice(${index})">
View
</button>

<button onclick="deleteInvoice(${index})">
Delete
</button>

</td>

`;

tbody.appendChild(row);

});

}
