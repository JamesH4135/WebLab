/**
 *  WebLab
 *  Copyright 2025 James H. Houck. All rights reserved.
 */

const fs = require("fs");
const msg = require("./messages");
const Mustache = require("mustache");
const fm = require("front-matter");
const md = require("markdown-it")({
    typographer: true,
    html: true
}).use(require("markdown-it-image-figures"), {figcaption: "alt"})
  .use(require("markdown-it-bracketed-spans"))
  .use(require("markdown-it-attrs"));

module.exports = class Page {
    constructor(templates, site) {
        this.templates = templates;
        this.site = site;
    }
    render(path, res) {
        let filePath = this.site.library + path + ".md";
        fs.readFile(filePath, "utf8", (err, text) => {
            if (err) { var text =  msg["404"] }
            let doc = fm(text);
            let html = md.render(doc.body);
            let view = {
                site: this.site,
                page: doc.attributes,
                body: html
            };
            let output = Mustache.render(this.templates["main"], view, {
                page: this.templates[doc.attributes.layout]
            });
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(output);
            res.end();
        });
    }
}

