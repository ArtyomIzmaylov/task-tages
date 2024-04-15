//я так запускаю 	node --max-old-space-size=512 --expose-gc --nouse-idle-notification main.js

function garbageCollector() {
    if (global.gc) {
        global.gc();
    }
}



const BUFFER_CAPACITY = (64 * 1024); // default 64 KB (64 * 1024)

const MAX_MEM_USE =  (10 * 1024 * 1024); // default 1  KB // 150

module.exports = {
    garbageCollector, MAX_MEM_USE, BUFFER_CAPACITY
}