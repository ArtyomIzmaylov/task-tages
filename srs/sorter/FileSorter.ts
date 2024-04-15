import {IFileCreateManager} from "../manager/FileCreateManager";
import * as stream from "stream";

export interface IFileSorterWriter {
    sortAndWriteToTmpFile(tempPath : string, stringsArray : string[], buffer_capacity : number) : Promise<void>
}
export class FileSorterWriter implements IFileSorterWriter{

    constructor(private readonly fileCreateManager : IFileCreateManager) {
    }
    async sortAndWriteToTmpFile(tempPath : string, stringsArray : string[], buffer_capacity : number) {
        stringsArray.sort();
        await this.fileCreateManager.createTmpFile(tempPath, stringsArray, buffer_capacity )
    }
}