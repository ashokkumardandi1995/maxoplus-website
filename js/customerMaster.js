let customers =
JSON.parse(localStorage.getItem("maxoCustomers")) || [];

const tbody =
document.getElementById("customerBody");

function loadCustomers(){

tbody.innerHTML="";

customers.forEach((customer,index)=>{

const row=document.createElement("tr");

row.innerHTML=`

<td>${customer.name}</td>

<td>${customer.phone}</td>

<td>${customer.gst}</td>

<td>${customer.address}</td>

<td>

<button onclick="editCustomer(${index})">

Edit

</button>

<button onclick="deleteCustomer(${index})">

Delete

</button>

</td>

`;

tbody.appendChild(row);

});

}

loadCustomers();
function deleteCustomer(index){

if(!confirm("Delete Customer?"))
return;

customers.splice(index,1);

localStorage.setItem(
"maxoCustomers",
JSON.stringify(customers)
);

loadCustomers();

}
