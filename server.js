/**
 *  WebLab
 *  Copyright 2025 James H. Houck. All rights reserved.
 */

// Load site information
const yaml = require("./app_modules/yaml");
let site = yaml.parse(__dirname + "/config.yaml");

const File = require("./app_modules/file");
const file = new File(__dirname, site);

// Load theme templates
let theme = yaml.parse(__dirname + "/page/index.yaml");
let templateFiles = {
    dir: __dirname + "/page/templates",
    names: theme.templates,
    ext: ".html"
};

const templates = require("./app_modules/templates");
const templatesObj = templates.load(templateFiles);

const Page = require("./app_modules/page.js");
const page = new Page(templatesObj, site);

// Create HTTP server
const http = require("http");
const server = http.createServer( function (req, res) {
    switch (req.method) {
    case "GET":
        let ext = file.findExt(req.url);
        if (req.url == "/") { page.render(site.home, res); }
        else if (ext == "") { page.render(req.url, res); }
        else { file.serve(req.url, res); }
        break;
    default:
        console.log(`HTTP ${req.method} method not supported`);
    }
});

server.listen(site.port, site.hostname, function () {
    console.log(`WebLab is running at http://${site.hostname}:${site.port}/`);
});

