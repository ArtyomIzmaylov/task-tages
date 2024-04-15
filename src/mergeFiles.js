const fs = require("fs");
const {merge} = require("./merge");
const crypto = require('crypto')
const path = require("path");

async function mergeFiles(fileNames, outputFileName) {
    if (fileNames.length === 1) {
        await fs.promises.rename(fileNames[0], outputFileName);
        return;
    }

    if (fileNames.length % 2 !== 0) {
        await fs.promises.writeFile('empty.txt', '');
        fileNames.push('empty.txt');
    }

    const pairs = [];
    for (let i = 0; i < fileNames.length; i += 2) {
        pairs.push([fileNames[i], fileNames[i + 1]]);
    }

    const mergedFileNames = [];
    for (const [file1, file2] of pairs) {
        console.log(pairs)
        const tempFileName =path.join(__dirname, 'tmp_merged', `merged_${crypto.randomBytes(16).toString('hex')}.tmp`);
        console.log(tempFileName)
        await merge(file1, file2, tempFileName);
        mergedFileNames.push(tempFileName);
    }

    await mergeFiles(mergedFileNames, outputFileName);
}
module.exports = {mergeFiles}