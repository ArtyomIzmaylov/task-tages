import * as fs from "fs";
import {pipeline} from 'stream/promises'

export interface IFileCreateManager {
    createTmpFile(tempPath : string, array : string[], buffer_capacity : number) : Promise<void>
}

export class FileCreateManager implements IFileCreateManager{

    async  createTmpFile(tempPath : string, array : string[], buffer_capacity : number) {
        console.log(tempPath)
        await pipeline(
            async function* () {
                for (let e of array) {
                    yield `${e}\n`;
                }
            },
            fs.createWriteStream(tempPath, { highWaterMark: buffer_capacity })
        );
    }



}