const path = require("path");
const fs = require("fs");


async function createTmpFolders() {
    try {
        await fs.mkdir(path.join(__dirname, 'tmp_sort'), e => console.log(e));
        await fs.mkdir(path.join(__dirname, 'tmp_merged'), e => console.log(e));
    } catch (e) {
        console.log(e)
    }
}

module.exports = {createTmpFolders}