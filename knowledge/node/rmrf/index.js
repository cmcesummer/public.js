const fs = require("fs");
const util = require("util");
const assert = require("assert");

const statPro = util.promisify(fs.stat);
const unlinkPro = util.promisify(fs.unlink);
const readdirPro = util.promisify(fs.readdir);
const rmdirPro = util.promisify(fs.rmdir);

const _rmrf = async function(p) {
    let stat;
    try {
        stat = await statPro(p);
    } catch (e) {
        if (e.code === "ENOENT") return;
        else console.log(e);
    }
    if (!stat.isDirectory()) {
        console.log(`rm ${p}`);
        await unlinkPro(p);
    } else {
        const files = await readdirPro(p);

        /**
         * 实现递归删除要么用这个 `for of`
         * 要么用下边的 `await Promise.all`
         */

        for (const file of files) {
            const path = `${p}/${file}`;
            await _rmrf(path);
        }

        /**
         * await只能能影响直接包裹它的async函数。因此在callback函数中的await并不会挂起整个async函数的执行。
         * await只会暂停map的callback，因此map完成时，不能保证asyncGet也全部完成
         * 正确的写法还得借助Promise.all
         */
        // await Promise.all(
        //     files.map(async file => {
        //         const path = `${p}/${file}`;
        //         return _rmrf(path);
        //     })
        // );

        console.log(`rm ${p}`);
        await rmdirPro(p);
    }
};

// (async function() {
//     await rmrf("./test");
//     console.log("over");
// })();

module.exports = async function rmrf(path, cb = _ => {}) {
    assert(path, 'need path');
    assert.equal(typeof path, 'string', 'path should be a string');
    assert.equal(typeof cb, 'function', 'callback sholud be a function')
    await _rmrf(path);
    cb && cb();
}


