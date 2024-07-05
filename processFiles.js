const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "input");
const outputDir = path.join(__dirname, "output");

if (!fs.existsSync(inputDir)) {
  fs.mkdirSync(inputDir);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function processFile(fileName) {
  const filePath = path.join(inputDir, fileName);
  const outputPath = path.join(outputDir, fileName);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${fileName}:`, err);
      return;
    }

    console.log(`Processing file: ${fileName}`);

    const processedData = data.toUpperCase();

    fs.writeFile(outputPath, processedData, (err) => {
      if (err) {
        console.error(`Error writing file ${fileName}:`, err);
        return;
      }

      console.log(`Finished processing file: ${fileName}`);
    });
  });
}

fs.watch(inputDir, (eventType, fileName) => {
  if (eventType === "rename" && fileName) {
    processFile(fileName);
  }
});

console.log(`Watching for file changes in ${inputDir}`);
