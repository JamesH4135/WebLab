/**
 *  WebLab
 *  Copyright 2025 James H. Houck. All rights reserved.
 */

const fs = require("fs");
const jsyaml = require("js-yaml");

exports.parse = function (path) {
    let obj = {};
    try { obj = jsyaml.load(fs.readFileSync(path, "utf8")); }
    catch (err) { console.log(err); }
    return obj;
};

