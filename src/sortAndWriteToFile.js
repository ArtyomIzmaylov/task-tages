const {createTmpFile} = require("./createTmpFile");
const {garbageCollector} = require("./initConfig");
async function sortAndWriteToTmpFile(tmpFileName, tempPath, stringsArray, buffer_capacity) {
    stringsArray.sort();
    await createTmpFile(tmpFileName, tempPath, stringsArray, buffer_capacity )
    garbageCollector()
}

module.exports = {sortAndWriteToTmpFile}