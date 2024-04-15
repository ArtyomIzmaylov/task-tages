const fs = require("fs");
const {garbageCollector} = require("./initConfig.js");
const readline = require("readline");
const {sortAndWriteToTmpFile} = require("./sortAndWriteToFile");
const {BUFFER_CAPACITY, MAX_MEM_USE} = require("./initConfig");
const path = require("path");

async function fileHandler(fileName, buffer_capacity, max_mem_use) {
    const file = fs.createReadStream(fileName, { highWaterMark: buffer_capacity });
    const lines = readline.createInterface({ input: file, crlfDelay: Infinity });
    const stringsArray = [];
    let size = 0;
    const tmpFileNames = [];
    let tempPathFile = ''
    for await (let line of lines) {
        size += Buffer.byteLength(line, 'utf8') + 1;
        stringsArray.push(line);
        if (size > max_mem_use) {
            tempPathFile = path.join(__dirname, 'tmp_sort', `temp_${tmpFileNames.length}.txt`)
            await sortAndWriteToTmpFile(tmpFileNames.length, tempPathFile, stringsArray, buffer_capacity);
            tmpFileNames.push(tempPathFile)
            stringsArray.length = 0
            size = 0;
        }
    }
    if (stringsArray.length > 0) {
        tempPathFile = path.join(__dirname, 'tmp_sort', `temp_${tmpFileNames.length}.txt`)
        await sortAndWriteToTmpFile(tmpFileNames.length, tempPathFile, stringsArray, buffer_capacity);
        tmpFileNames.push(tempPathFile)
        stringsArray.length = 0
        size = 0;
    }
    lines.close()
    file.close()
    garbageCollector()
    return tmpFileNames
}

module.exports = fileHandler
