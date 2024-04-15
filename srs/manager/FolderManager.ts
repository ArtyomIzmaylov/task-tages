import * as fs from "fs";
import * as path from "path";


export interface IFolderManager {
    createTmpFolders() : Promise<void>
    removeTmpFolders() : Promise<void>
}
export class FolderManager implements IFolderManager{
    constructor(private readonly tmpFileSortName : string, private readonly tmpFileMergedName : string) {

    }
    async  createTmpFolders() {
        try {
            fs.mkdir(this.tmpFileSortName, e => console.log(e));
            fs.mkdir(this.tmpFileMergedName, e => console.log(e));
        } catch (e) {
            console.log(e)
        }
    }
    async removeTmpFolders() {
        try {
            fs.rm(path.join(__dirname, this.tmpFileSortName),{recursive : true}, e => console.log(e), );
            fs.rm(path.join(__dirname, this.tmpFileMergedName), {recursive : true}, e => console.log(e));
        } catch (e) {
            console.log(e)
        }
    }
}