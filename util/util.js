var fs = require('fs');

module.exports = class util {
    static copy(src, dst) {
        fs.createReadStream(src).pipe(fs.createWriteStream(dst));
    }
};