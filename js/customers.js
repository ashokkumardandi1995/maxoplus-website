let customers = [];

fetch("data/customers.json?v=" + Date.now())
.then(res => res.json())
.then(data => {

    customers = data;

});

const searchBox =
document.getElementById("customerSearch");

searchBox.addEventListener("input", searchCustomer);

function searchCustomer(){

const value =
searchBox.value.toLowerCase().trim();

const list =
document.getElementById("customerList");

list.innerHTML = "";

if(value===""){
return;
}

const result =
customers.filter(c=>

c.name.toLowerCase().includes(value) ||

c.phone.includes(value) ||

c.gst.toLowerCase().includes(value)

);

result.forEach(customer=>{

const item =
document.createElement("div");

item.className = "customerItem";

item.innerHTML =
`
<b>${customer.name}</b><br>
${customer.phone}<br>
${customer.gst}
`;

item.onclick = function(){

document.getElementById("customerName").value =
customer.name;

document.getElementById("customerPhone").value =
customer.phone;

document.getElementById("customerGST").value =
customer.gst;

document.getElementById("customerAddress").value =
customer.address;

list.innerHTML="";

searchBox.value = customer.name;

}

list.appendChild(item);

});

}
