const { pipeline } = require("stream/promises");
const { createWriteStream, createReadStream } = require("fs");
const { createInterface } = require("readline");



async function merge(file1, file2, outputFileName) {
    const file = createWriteStream(outputFileName);
    const reader1 = createInterface({ input: createReadStream(file1), crlfDelay: Infinity })[Symbol.asyncIterator]();
    const reader2 = createInterface({ input: createReadStream(file2), crlfDelay: Infinity })[Symbol.asyncIterator]();

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


module.exports = {merge};
