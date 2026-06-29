console.log("Searching...");
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

function editCustomer(index){

    alert(customers[index].name);

}
document
.getElementById("searchCustomer")
.addEventListener("input", searchCustomer);

function searchCustomer(){

const value =
document.getElementById("searchCustomer")
.value.toLowerCase();

tbody.innerHTML = "";

customers
.filter(customer =>

customer.name.toLowerCase().includes(value) ||

customer.phone.includes(value) ||

customer.gst.toLowerCase().includes(value)

)

.forEach((customer,index)=>{

const row = document.createElement("tr");

row.innerHTML = `

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
