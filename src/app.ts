import * as path from "path";
import {FolderManager} from "./manager/FolderManager";
import {FileHandler} from "./handler/FIleHandler";
import {FileSorterWriter} from "./sorter/FileSorter";
import {MemoryManager} from "./manager/MemoryManager";
import {FileCreateManager} from "./manager/FileCreateManager";
import {BUFFER_CAPACITY, MAX_MEM_USE} from "./initConfig";
import {FileMergeManager} from "./manager/FileMergeManager";



(() => {
    const folderManager = new FolderManager(
        path.join(__dirname, '..', 'tmp_sort'), path.join(__dirname, '..', 'tmp_merged'))
    folderManager.createTmpFolders()
        .then(() => new FileHandler(
            new FileSorterWriter(
                new FileCreateManager()),
            new MemoryManager()).handleFile(path.join(__dirname, 'input.txt'), BUFFER_CAPACITY, MAX_MEM_USE)
            .then(tmpFileNames => new FileMergeManager().mergeAllFiles(tmpFileNames, path.join(__dirname, 'output.txt'))))
        .then(() => folderManager.removeTmpFolders())
        .catch((e => console.log(e)))

})()


