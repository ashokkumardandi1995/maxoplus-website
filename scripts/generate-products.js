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

const titleMatch = content.match(/title:\s*(.+)/);
const imageMatch = content.match(/image:\s*(.+)/);

const descMatch = content.match(
/description:\s*([\s\S]*?)---/m
);

products.push({
title: titleMatch
? titleMatch[1].replace(/"/g, "").trim()
: "",

```
image: imageMatch
  ? imageMatch[1].replace(/"/g, "").trim()
  : "",

description: descMatch
  ? descMatch[1]
      .replace(/"/g, "")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  : ""
```

});
});

fs.writeFileSync(
outputFile,
JSON.stringify(products, null, 2)
);

console.log("products.json generated");
