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
