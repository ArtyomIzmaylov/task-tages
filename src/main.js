const {BUFFER_CAPACITY, garbageCollector, MAX_MEM_USE} = require("./initConfig.js");
const path = require("path");
const fileHandler = require("./fileHandler");
const {mergeFiles} = require("./mergeFiles");
const {createTmpFolders} = require("./createTmpFolders");
const {removeTmpFolders} = require("./removeTmpFolders");


(() => {
    createTmpFolders()
        .then(() => fileHandler(path.join(__dirname, 'input.txt'), BUFFER_CAPACITY, MAX_MEM_USE)
            .then(tmpFileNames => mergeFiles(tmpFileNames, path.join(__dirname, 'output.txt')))
        ).then(() => removeTmpFolders())
})();

