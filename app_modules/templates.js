/**
 *  WebLab
 *  Copyright 2025 James H. Houck. All rights reserved.
 */

const fs = require("fs");

exports.load = function (list) {
    let docs = {};
    for (let idx = 0; idx < list.names.length; idx++) {
        let filePath = list.dir + "/" + list.names[idx] + list.ext;
        docs[list.names[idx]] = fs.readFileSync(filePath, "utf8");
    }
    return docs;
};

