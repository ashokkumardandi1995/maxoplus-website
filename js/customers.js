let customers = [];

fetch("data/customers.json?v=" + Date.now())
.then(res => res.json())
.then(data => {

    customers = data;

    console.log("Customers Loaded:", customers);

})
.catch(err => {

    console.log("Customer file not found", err);

});
