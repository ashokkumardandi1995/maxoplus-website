function getNextInvoiceNumber(){

let invoices =
JSON.parse(localStorage.getItem("maxoInvoices")) || [];

let next = invoices.length + 1;

return "INV-" + String(next).padStart(5,"0");

}
let products = [];

fetch("products.json?v=" + Date.now())
.then(res => res.json())
.then(data => {

products = data;

document.getElementById("addProduct").click();

});

document.getElementById("addProduct").addEventListener("click", addRow);

function addRow(){

const tbody =
document.getElementById("productBody");

const row =
document.createElement("tr");

let options = "";

products.forEach((p,index)=>{

options += `
<option value="${index}">
${p.title}
</option>
`;

});

row.innerHTML = `

<td>
<select class="product">
${options}
</select>
</td>

<td>
<input type="number" class="boxes" value="0" min="0">
</td>

<td>
<input type="number" class="units" value="0" min="0">
</td>

<td>
<input type="number" class="price" value="0" min="0">
</td>

<td class="totalUnits">0</td>

<td class="total">0</td>

<td>
<button type="button" class="removeBtn">X</button>
</td>

`;

tbody.appendChild(row);

updateRow(row);

row.querySelector(".product").onchange = () => updateRow(row);

row.querySelector(".boxes").oninput = () => updateRow(row);

row.querySelector(".units").oninput = () => updateRow(row);

row.querySelector(".price").oninput = () => updateRow(row);

row.querySelector(".removeBtn").addEventListener("click", function(){

row.remove();

calculateGrandTotal();

});

}
function updateRow(row){

const boxes =
Number(row.querySelector(".boxes").value);

const units =
Number(row.querySelector(".units").value);

const price =
Number(row.querySelector(".price").value);

const totalUnits =
(boxes * 12) + units;

row.querySelector(".totalUnits").innerText =
totalUnits;

row.querySelector(".total").innerText =
(totalUnits * price).toFixed(2);

calculateGrandTotal();

}

function calculateGrandTotal(){

let total = 0;

document.querySelectorAll("#productBody tr")
.forEach(row=>{

total += Number(
row.querySelector(".total").innerText
);

});

document.getElementById("grandTotal")
.innerText = total.toFixed(2);

}
document.getElementById("invoiceDate").value =
new Date().toISOString().split("T")[0];
document.getElementById("invoiceNo").value =
getNextInvoiceNumber();
document
.getElementById("generateInvoice")
.addEventListener("click", generateInvoice);

function generateInvoice(){

const invoice = {

invoiceNo:
document.getElementById("invoiceNo").value,

invoiceDate:
document.getElementById("invoiceDate").value,

customerName:
document.getElementById("customerName").value,

customerPhone:
document.getElementById("customerPhone").value,

customerGST:
document.getElementById("customerGST").value,

customerAddress:
document.getElementById("customerAddress").value,

grandTotal:
document.getElementById("grandTotal").innerText,

products:[]

};

document
.querySelectorAll("#productBody tr")
.forEach(row=>{

invoice.products.push({

product:

row.querySelector(".product")
.options[
row.querySelector(".product").selectedIndex
].text,

boxes:
row.querySelector(".boxes").value,

units:
row.querySelector(".units").value,

price:
row.querySelector(".price").value,

total:
row.querySelector(".total").innerText

});

});

saveInvoice(invoice);

createPDF(invoice);

document.getElementById("invoiceNo").value =
getNextInvoiceNumber();
  
}
const oldInvoice =
JSON.parse(localStorage.getItem("currentInvoice"));

if(oldInvoice){

document.getElementById("invoiceNo").value =
oldInvoice.invoiceNo;

document.getElementById("invoiceDate").value =
oldInvoice.invoiceDate;

document.getElementById("customerName").value =
oldInvoice.customerName;

document.getElementById("customerPhone").value =
oldInvoice.customerPhone;

document.getElementById("customerGST").value =
oldInvoice.customerGST;

document.getElementById("customerAddress").value =
oldInvoice.customerAddress;

localStorage.removeItem("currentInvoice");
document.getElementById("productBody").innerHTML = "";

oldInvoice.products.forEach(item=>{

addRow();

const row =
document.querySelector("#productBody tr:last-child");

row.querySelector(".product").value =
products.findIndex(p=>p.title===item.product);

row.querySelector(".boxes").value =
item.boxes;

row.querySelector(".units").value =
item.units;

row.querySelector(".price").value =
item.price;

updateRow(row);

});
}
