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
