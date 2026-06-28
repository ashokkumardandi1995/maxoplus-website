async function createPDF(invoice){

const { jsPDF } = window.jspdf;

const doc = new jsPDF("p","mm","a4");

doc.setFont("helvetica","bold");

doc.setFontSize(22);

doc.text("TAX INVOICE",105,20,{align:"center"});

doc.setFontSize(18);

doc.setTextColor(0,0,0);

doc.text("MAXO PLUS",20,35);

doc.setFontSize(10);

doc.setTextColor(0);

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
  doc.autoTable({

startY:120,

head:[[
"Product",
"Boxes",
"Units",
"Price",
"Total Units",
"Total"
]],

body:rows,

theme:"grid",

headStyles:{
fillColor:[220,220,220],
textColor:[0,0,0]
}
styles:{
fontSize:10,
valign:"middle",
halign:"center"
},

columnStyles:{
0:{cellWidth:60,halign:"left"},
1:{cellWidth:18},
2:{cellWidth:18},
3:{cellWidth:25},
4:{cellWidth:28},
5:{cellWidth:32}
}

});

const finalY = doc.lastAutoTable.finalY + 12;

doc.setFillColor(0,74,173);

doc.roundedRect(105, finalY-6, 85, 12, 2, 2, "F");

doc.setTextColor(255,255,255);

doc.setFontSize(11);

doc.setFont("helvetica","bold");

doc.text(
"Grand Total : ₹ " + invoice.grandTotal,
147,
finalY + 2,
{align:"center"}
);

doc.setTextColor(0,0,0);

doc.save(invoice.invoiceNo + ".pdf");

}
