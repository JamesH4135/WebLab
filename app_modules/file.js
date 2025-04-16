/**
 *  WebLab
 *  Copyright 2025 James H. Houck. All rights reserved.
 */

const fs = require("fs");
const media = require("./media-types");

module.exports = class File {
    constructor(dir, site) {
        this.dir = dir;
        this.site = site;
    }
    serve = function(path, res) {
        let ext = this.findExt(path);
        if (!media[ext]) {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("415 Media Type Not Found");
        }
        else if (ext == "css" || ext == "js" ||
                 ext == "ttf" || ext == "woff" || ext == "woff2" ||
                 path == this.site.favicon) {
            res.writeHead(200, { "Content-Type": media[ext] });
            let readFile = fs.createReadStream(this.dir + path);
            readFile.on("error", (err) => {
                res.end("404 File Not Found");
            }).pipe(res);
        }
        else if (path == "/favicon.ico") {
            let filePath = this.dir + this.site.favicon;
            let fileExt = this.findExt(filePath);
            res.writeHead(200, { "Content-Type": media[fileExt] });
            let readFile = fs.createReadStream(filePath);
            readFile.on("error", (err) => {
                res.end("404 File Not Found");
            }).pipe(res);
        }
        else {
            res.writeHead(200, { "Content-Type": media[ext] });
            let readFile = fs.createReadStream(this.site.library + path);
            readFile.on("error", (err) => {
                res.end("404 File Not Found");
            }).pipe(res);
        }
    }
    findExt = function(name) {
        let nameAry = name.split(".");
        if (nameAry.length == 1) { return false; }
        if (nameAry.length > 1) { return nameAry[nameAry.length - 1]; }
    }
}

