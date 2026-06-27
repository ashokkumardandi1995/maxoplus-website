let customers = [];

fetch("data/customers.json?v=" + Date.now())
.then(res => res.json())
.then(data=>{

    customers = data;

});

const searchBox =
document.getElementById("customerSearch");

searchBox.addEventListener("input",function(){

const value =
this.value.toLowerCase().trim();

const customer =
customers.find(c=>

c.name.toLowerCase().includes(value) ||

c.phone.includes(value) ||

c.gst.toLowerCase().includes(value)

);

if(customer){

document.getElementById("customerName").value =
customer.name;

document.getElementById("customerPhone").value =
customer.phone;

document.getElementById("customerGST").value =
customer.gst;

document.getElementById("customerAddress").value =
customer.address;

}

});
