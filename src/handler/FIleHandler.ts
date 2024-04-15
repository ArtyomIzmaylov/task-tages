import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";
import {IFileSorterWriter} from "../sorter/FileSorter";
import {IMemoryManager} from "../manager/MemoryManager";


export interface IFileHandler {
    handleFile(fileName : string, buffer_capacity : number, max_mem_use : number) : Promise<string[]>
}
export class FileHandler implements IFileHandler{
    constructor(private readonly fileSorter : IFileSorterWriter, private readonly memoryManager : IMemoryManager) {
    }
    async handleFile(fileName : string, buffer_capacity : number, max_mem_use : number) {
        const file = fs.createReadStream(fileName, { highWaterMark: buffer_capacity });
        const lines = readline.createInterface({ input: file, crlfDelay: Infinity });
        const stringsArray : string[] = [];
        let size = 0;
        const tmpFileNames : string[] = [];
        let tempPathFile = ''
        for await (let line of lines) {
            size += Buffer.byteLength(line, 'utf8') + 1;
            stringsArray.push(line);
            if (size > max_mem_use) {
                tempPathFile = path.join(__dirname, '..', 'tmp_sort', `temp_${tmpFileNames.length}.txt`)
                await this.fileSorter.sortAndWriteToTmpFile(tempPathFile, stringsArray, buffer_capacity);
                tmpFileNames.push(tempPathFile)
                stringsArray.length = 0
                size = 0;
            }
        }
        if (stringsArray.length > 0) {
            tempPathFile = path.join(__dirname, '..', 'tmp_sort', `temp_${tmpFileNames.length}.txt`)
            await this.fileSorter.sortAndWriteToTmpFile(tempPathFile, stringsArray, buffer_capacity);
            tmpFileNames.push(tempPathFile)
            stringsArray.length = 0
            size = 0;
        }
        lines.close()
        file.close()
        this.memoryManager.clearMemory()
        return tmpFileNames
    }
}