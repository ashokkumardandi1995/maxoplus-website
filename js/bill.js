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

row.querySelector(".qty").oninput = () => updateRow(row);

row.querySelector(".removeBtn").onclick = () => {

row.remove();

calculateGrandTotal();

};

}
function updateRow(row){

const productIndex =
row.querySelector(".product").value;

const product =
products[productIndex];

const price = Number(product.price || 0);

const qty =
Number(row.querySelector(".qty").value);

row.querySelector(".price").value = price;

row.querySelector(".total").innerText =
(price * qty).toFixed(2);

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
