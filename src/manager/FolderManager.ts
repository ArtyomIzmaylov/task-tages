import * as fs from "fs";


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
            fs.rm(this.tmpFileSortName,{recursive : true}, e => console.log(e), );
            fs.rm(this.tmpFileMergedName, {recursive : true}, e => console.log(e));
        } catch (e) {
            console.log(e)
        }
    }
}