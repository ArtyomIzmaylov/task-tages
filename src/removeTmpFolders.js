const fs = require("fs");
const path = require("path");

async function removeTmpFolders() {
    try {
        await fs.rm(path.join(__dirname, 'tmp_sort'),{recursive : true}, e => console.log(e), );
        await fs.rm(path.join(__dirname, 'tmp_merged'), {recursive : true}, e => console.log(e));
    } catch (e) {
        console.log(e)
    }
}

module.exports = {removeTmpFolders}