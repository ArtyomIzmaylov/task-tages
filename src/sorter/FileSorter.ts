import {IFileCreateManager} from "../manager/FileCreateManager";

export interface IFileSorterWriter {
    sortAndWriteToTmpFile(tempPath : string, stringsArray : string[], buffer_capacity : number) : Promise<void>
}
export class FileSorterWriter implements IFileSorterWriter{

    constructor(private readonly fileCreateManager : IFileCreateManager) {
    }
    async sortAndWriteToTmpFile(tempPath : string, stringsArray : string[], buffer_capacity : number) {
        console.log(stringsArray.length)
        stringsArray.sort();
        await this.fileCreateManager.createTmpFile(tempPath, stringsArray, buffer_capacity )
    }
}