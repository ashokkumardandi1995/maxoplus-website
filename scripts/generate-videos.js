const fs = require("fs");
const path = require("path");

const videosDir = "content/videos";
const outputFile = "videos.json";

const videos = [];

const files = fs.readdirSync(videosDir);

files.forEach(file => {

if (!file.endsWith(".md")) return;

const content = fs.readFileSync(
path.join(videosDir, file),
"utf8"
);

const titleMatch = content.match(/title:\s*(.+)/);
const videoMatch = content.match(/video:\s*(.+)/);
const thumbMatch = content.match(/thumbnail:\s*(.+)/);

videos.push({
title: titleMatch ? titleMatch[1].trim() : "",
video: videoMatch ? videoMatch[1].trim() : "",
thumbnail: thumbMatch ? thumbMatch[1].trim() : ""
});

});

fs.writeFileSync(
outputFile,
JSON.stringify(videos, null, 2)
);

console.log("videos.json generated");
