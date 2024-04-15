const fs = require('fs');
const readline = require('readline');
const path = require("path");

function printFirstAndLastLine(filePath) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });


    let firstLine = null;
    let lastLine = null;

    rl.on('line', (line) => {
        if (!firstLine) {
            firstLine = line;
        }
        lastLine = line;
    });
    rl.on('close', () => {
        // Выводим первую и последнюю строку
        console.log('First line:', firstLine[0]);
        console.log('Last line:', lastLine[0]);
    });
}

printFirstAndLastLine(path.join(__dirname, '..', 'output.txt'));
