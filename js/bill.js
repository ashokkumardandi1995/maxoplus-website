let products = [];

fetch("products.json?v=" + Date.now())
.then(res => res.json())
.then(data => {

products = data;

document.getElementById("addProduct").click();

});

document
.getElementById("addProduct")
.addEventListener("click", addRow);

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
