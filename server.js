/**
 *  WebLab
 *  Copyright 2025 James H. Houck. All rights reserved.
 */

// Load site information
const yaml = require("./app_modules/yaml");
let site = yaml.parse(__dirname + "/config.yaml");

const File = require("./app_modules/file");
const file = new File(__dirname, site);

// Create HTTP server
const http = require("http");
const server = http.createServer( function (req, res) {
    switch (req.method) {
    case "GET":
        let ext = file.findExt(req.url);
        if (req.url == "/") { file.serve(site.home, res); }
        else { file.serve(req.url, res); }
        break;
    default:
        console.log(`HTTP ${req.method} method not supported`);
    }
});

server.listen(site.port, site.hostname, function () {
    console.log(`WebLab is running at http://${site.hostname}:${site.port}/`);
});

