async function createPDF(invoice){

const { jsPDF } = window.jspdf;

const doc = new jsPDF("p","mm","a4");
// =========================
// WATERMARK
// =========================

doc.saveGraphicsState();

doc.setGState(new doc.GState({opacity:0.06}));

doc.setFont("helvetica","bold");
doc.setFontSize(60);

doc.setTextColor(180);

doc.text(
"MAXO PLUS",
105,
170,
{
angle:45,
align:"center"
}
);
doc.restoreGraphicsState();

doc.setTextColor(0);
// =========================
// MAXO PLUS HEADER
// =========================

doc.setFont("helvetica","bold");
doc.setFontSize(18);
doc.text("MAXO PLUS",15,15);

doc.setFont("helvetica","normal");
doc.setFontSize(9);
doc.text("Premium Cleaning Solutions For Every Home",15,20);
doc.text("Visakhapatnam, Andhra Pradesh",15,25);
doc.text("Phone : +91 9493945946",15,30);
doc.text("Email : maxopluscare@gmail.com",15,35);

doc.setFont("helvetica","bold");
doc.setFontSize(20);
doc.text("TAX INVOICE",195,15,{align:"right"});

// Invoice Information Box
doc.rect(140,20,55,28);

doc.setFontSize(9);
doc.setFont("helvetica","bold");

doc.text("Invoice No",145,28);
doc.text(invoice.invoiceNo,145,34);

doc.text("Date",145,42);
doc.text(invoice.invoiceDate,145,48);

// Divider
doc.setLineWidth(0.5);
doc.line(15,55,195,55);

// =========================
// BILL TO
// =========================

doc.rect(15,60,180,38);

doc.setFont("helvetica","bold");
doc.setFontSize(11);
doc.text("BILL TO",18,67);

doc.setFont("helvetica","normal");
doc.setFontSize(10);

doc.text("Customer :",18,75);
doc.text(invoice.customerName || "-",42,75);

doc.text("Phone :",18,82);
doc.text(invoice.customerPhone || "-",42,82);

doc.text("GSTIN :",110,82);
doc.text(invoice.customerGST || "-",128,82);

doc.text("Address :",18,89);

const address =
doc.splitTextToSize(
invoice.customerAddress || "-",
140
);

doc.text(address,42,89);
const rows = [];
invoice.products.forEach((item,index)=>{

rows.push([

index + 1,
item.product,
item.boxes,
item.units,
(Number(item.boxes)*12)+Number(item.units),
item.price,
item.total

]);

});
  doc.autoTable({

startY:105,

head:[[
"Sl",
"Product",
"Boxes",
"Units",
"Qty",
"Rate",
"Amount"
]]

body:rows,

theme:"grid",

headStyles:{
fillColor:[220,220,220],
textColor:[0,0,0]
},
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

const finalY = doc.lastAutoTable.finalY + 10;

// Summary Box
doc.rect(120, finalY, 70, 32);

doc.setFont("helvetica","normal");
doc.setFontSize(10);

doc.text("Sub Total",125,finalY+8);
doc.text("CGST (0%)",125,finalY+15);
doc.text("SGST (0%)",125,finalY+22);

doc.setFont("helvetica","bold");
doc.text("Grand Total",125,finalY+29);

// Amounts
doc.setFont("helvetica","normal");

doc.text("₹ " + invoice.grandTotal,185,finalY+8,{align:"right"});
doc.text("₹ 0.00",185,finalY+15,{align:"right"});
doc.text("₹ 0.00",185,finalY+22,{align:"right"});

doc.setFont("helvetica","bold");
doc.text("₹ " + invoice.grandTotal,185,finalY+29,{align:"right"});
doc.setFont("helvetica","bold");
doc.setFontSize(10);

doc.text(
"Amount in Words",
15,
finalY+12
);

doc.setFont("helvetica","normal");
doc.setFontSize(9);

doc.text(
numberToWords(Number(invoice.grandTotal)) + " Rupees Only",
15,
finalY+19
);
// =========================
// Signature
// =========================

doc.line(15, finalY+42, 195, finalY+42);

doc.setFont("helvetica","normal");
doc.setFontSize(10);

doc.text(
"For MAXO PLUS",
145,
finalY+48
);

doc.text(
"Authorized Signatory",
145,
finalY+55
);

// =========================
// Footer
// =========================

doc.setFontSize(8);
doc.setTextColor(120);

doc.text(
"This is a computer-generated invoice.",
15,
290
);

doc.setTextColor(0);

// =========================
// Save PDF
// =========================

doc.save(invoice.invoiceNo + ".pdf");

}
function numberToWords(num){

const a=[
"",
"One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
"Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen",
"Sixteen","Seventeen","Eighteen","Nineteen"
];

const b=[
"",
"",
"Twenty",
"Thirty",
"Forty",
"Fifty",
"Sixty",
"Seventy",
"Eighty",
"Ninety"
];

if(num<20) return a[num];

if(num<100)
return b[Math.floor(num/10)]+" "+a[num%10];

if(num<1000)
return a[Math.floor(num/100)]+" Hundred "+numberToWords(num%100);

if(num<100000)
return numberToWords(Math.floor(num/1000))+
" Thousand "+
numberToWords(num%1000);

if(num<10000000)
return numberToWords(Math.floor(num/100000))+
" Lakh "+
numberToWords(num%100000);

return num.toString();

}
