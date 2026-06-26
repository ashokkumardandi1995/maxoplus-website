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
<input type="number" class="price" value="0">
</td>

<td>
<input type="number" class="qty" value="1" min="1">
</td>

<td class="total">0</td>

<td>
<button type="button" class="removeBtn">X</button>
</td>

`;

tbody.appendChild(row);

}
