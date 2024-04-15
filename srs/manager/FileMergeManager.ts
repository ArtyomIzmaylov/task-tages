import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";
import {pipeline} from "stream/promises";
import {createInterface} from 'readline';
export interface IFileMergeManager {
    mergeAllFiles(fileNames : string[], outputFileName : string) : Promise<void>
}
export class FileMergeManager implements IFileMergeManager{


    async mergeAllFiles(fileNames : string[], outputFileName : string) {
        if (fileNames.length === 1) {
            await fs.promises.rename(fileNames[0], outputFileName);
            return;
        }

        if (fileNames.length % 2 !== 0) {
            await fs.promises.writeFile('empty.txt', '');
            fileNames.push('empty.txt');
        }

        const pairs = [];
        for (let i = 0; i < fileNames.length; i += 2) {
            pairs.push([fileNames[i], fileNames[i + 1]]);
        }

        const mergedFileNames = [];
        for (const [file1, file2] of pairs) {
            const tempFileName =path.join(__dirname, '..', 'tmp_merged', `merged_${crypto.randomBytes(16).toString('hex')}.tmp`);
            await this.mergeTwoFiles(file1, file2, tempFileName);
            mergedFileNames.push(tempFileName);
        }

        await this.mergeAllFiles(mergedFileNames, outputFileName);
    }

    private async mergeTwoFiles(file1 : string, file2 : string, outputFileName : string) {
        const file = fs.createWriteStream(outputFileName);
        const reader1 = createInterface({ input: fs.createReadStream(file1), crlfDelay: Infinity })[Symbol.asyncIterator]();
        const reader2 = createInterface({ input: fs.createReadStream(file2), crlfDelay: Infinity })[Symbol.asyncIterator]();

        const strings = await Promise.all([reader1.next(), reader2.next()]);
        return pipeline(
            async function* () {
                while (strings.length > 0) {
                    const [minString, minStringIndex] = strings.reduce((prev, cur, idx) => {
                        if (cur.value < prev[0].value) {
                            return [cur, idx];
                        } else {
                            return prev;
                        }
                    }, [strings[0], 0]);

                    yield `${minString.value}\n`;
                    const res = await (minStringIndex === 0 ? reader1 : reader2).next();
                    if (!res.done) {
                        strings[minStringIndex] = res;
                    } else {
                        strings.splice(minStringIndex, 1);
                    }
                }
            },
            file
        );
    }

}