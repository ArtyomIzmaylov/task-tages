const {pipeline} = require("stream/promises");
const fs = require("fs");

async function createTmpFile(tmpFileName, tempPath, array, buffer_capacity) {

    await pipeline(
        async function* () {
            for (let e of array) {
                yield `${e}\n`;
            }
        },
        fs.createWriteStream(tempPath, { highWaterMark: buffer_capacity })
    );
}

module.exports = {createTmpFile}