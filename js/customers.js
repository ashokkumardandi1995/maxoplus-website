let customers = [];

// Load customers from localStorage
customers =
JSON.parse(localStorage.getItem("maxoCustomers")) || [];

// If empty, load the default JSON once
if(customers.length === 0){

fetch("data/customers.json?v=" + Date.now())
.then(res => res.json())
.then(data => {

customers = data;

localStorage.setItem(
"maxoCustomers",
JSON.stringify(customers)
);

});

}

const searchBox = document.getElementById("customerSearch");
const list = document.getElementById("customerList");

searchBox.addEventListener("input", searchCustomer);

function searchCustomer(){

    const value = searchBox.value.toLowerCase().trim();

    list.innerHTML = "";

    if(value === ""){
        return;
    }

    const result = customers.filter(c =>
        c.name.toLowerCase().includes(value) ||
        c.phone.includes(value) ||
        c.gst.toLowerCase().includes(value)
    );

    result.forEach(customer => {

        const item = document.createElement("div");

        item.className = "customerItem";

        item.innerHTML = `
            <b>${customer.name}</b><br>
            ${customer.phone}<br>
            ${customer.gst}
        `;

        item.onclick = function(){

            searchBox.value = customer.name;

            document.getElementById("customerName").value = customer.name;
            document.getElementById("customerPhone").value = customer.phone;
            document.getElementById("customerGST").value = customer.gst;
            document.getElementById("customerAddress").value = customer.address;

         list.innerHTML="";
         list.style.display="none";

        };

        list.appendChild(item);
        list.style.display="block";

    });

}

document.getElementById("clearCustomer").onclick = function(){

    searchBox.value = "";

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerGST").value = "";
    document.getElementById("customerAddress").value = "";

    list.innerHTML = "";

};
