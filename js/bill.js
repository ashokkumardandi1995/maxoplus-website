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

createPDF(invoice);
  

}

async function createPDF(invoice){

const { jsPDF } = window.jspdf;

const doc = new jsPDF("p","mm","a4");

doc.setFont("helvetica","bold");

doc.setFontSize(22);

doc.text("TAX INVOICE",105,20,{align:"center"});

doc.setFontSize(18);

doc.setTextColor(0,74,173);

doc.text("MAXO PLUS",20,35);

doc.setFontSize(10);

doc.setTextColor(80);

doc.text("Premium Cleaning Solutions For Every Home",20,42);

doc.text("Visakhapatnam, Andhra Pradesh",20,48);

doc.text("Phone : +91 9493945946",20,54);

doc.text("Email : maxopluscare@gmail.com",20,60);

doc.setTextColor(0);

doc.text("Invoice No : " + invoice.invoiceNo,140,35);

doc.text("Date : " + invoice.invoiceDate,140,42);

doc.line(20,68,190,68);

doc.setFontSize(14);

doc.text("Customer Details",20,78);

doc.setFontSize(11);

doc.text("Name : " + invoice.customerName,20,88);

doc.text("Phone : " + invoice.customerPhone,20,95);

doc.text("GST : " + invoice.customerGST,20,102);

doc.text("Address : " + invoice.customerAddress,20,109);
  const rows = [];

invoice.products.forEach(item=>{

rows.push([

item.product,
item.boxes,
item.units,
item.price,
String((Number(item.boxes)*12)+Number(item.units)),
item.total

]);

});

doc.autoTable({

startY:120,

head:[[
"Product",
"Boxes",
"Units",
"Price",
"Total Units",
"Total"
]],

body:rows,

theme:"grid",

headStyles:{
fillColor:[0,74,173]
},

styles:{
fontSize:10,
halign:"center"
}

});
const finalY = doc.lastAutoTable.finalY + 12;

doc.setFontSize(14);
doc.setFont("helvetica","bold");

doc.setFillColor(0,74,173);

doc.rect(120, finalY-8, 70, 12, "F");

doc.setTextColor(255,255,255);

doc.setFontSize(12);

doc.text(
"Grand Total : ₹ " + invoice.grandTotal,
155,
finalY,
{align:"center"}
);

doc.setTextColor(0,0,0);
doc.save(invoice.invoiceNo + ".pdf");

}
