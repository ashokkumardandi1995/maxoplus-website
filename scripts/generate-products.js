const fs = require("fs");
const path = require("path");

const productsDir = "content/products";
const outputFile = "products.json";

const products = [];

const files = fs.readdirSync(productsDir);

files.forEach(file => {
  if (!file.endsWith(".md")) return;

  const content = fs.readFileSync(
    path.join(productsDir, file),
    "utf8"
  );

  const titleMatch = content.match(/title:\s*(.*)/);
  const imageMatch = content.match(/image:\s*(.*)/);
  const descMatch = content.match(/description:\s*(.*)/);

  products.push({
    title: titleMatch ? titleMatch[1].trim() : "",
    image: imageMatch ? imageMatch[1].trim() : "",
    description: descMatch ? descMatch[1].trim() : ""
  });
});

fs.writeFileSync(
  outputFile,
  JSON.stringify(products, null, 2)
);

console.log("products.json generated");
