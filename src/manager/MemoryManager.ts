

export interface IMemoryManager {
    clearMemory() : void
}
export class MemoryManager implements IMemoryManager{
    clearMemory() {
        if (global.gc) {
            global.gc();
        }
    }
}