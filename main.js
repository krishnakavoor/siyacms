/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var http = require('http');
var fs = require('fs');
var url = require('url');

// maps file extention to MIME types
const mimeType = {
    'ico': 'image/x-icon',
    'html': 'text/html',
    'js': 'text/javascript',
    'json': 'application/json',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'wav': 'audio/wav',
    'mp3': 'audio/mpeg',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'eot': 'appliaction/vnd.ms-fontobject',
    'ttf': 'aplication/font-sfnt'
};

var themeName = 'default';

var ThemeEngine = function (template) {
    var layout = fs.readFileSync('theme/' + themeName + '/' + template + '.html');
    layout = layout.toString();
    var re = /{!([^!}]+)?!}/g, match;
    while (match = re.exec(layout)) {
        var header = fs.readFileSync('theme/' + themeName + '/includes/' + match[1] + '.html');
        layout = layout.replace(match[0], header.toString());
    }
    return layout;
}

var TemplateEngine = function (html, data) {
    var text = html.toString();
    var re = /{{([^}}]+)?}}/g, match;
    while (match = re.exec(text)) {
        text = text.replace(match[0], data[match[1]])
    }
    return text;
}

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);

    fileExtension = q.pathname.split('.').pop();
    if (q.pathname === '/favicon.ico') {
        res.end();
        return;
    }

    if (mimeType[fileExtension] !== undefined) {
        try {
            res.writeHead(200, {'Content-Type': mimeType[fileExtension]});
            var staticFiles = fs.readFileSync(q.pathname.slice(1));
            res.end(staticFiles);
            return;
        } catch (err) {
            res.end();
            return;
        }
    }





    //htmls
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (q.pathname === '/') {
        var theme = ThemeEngine('home');
        var data = {title: "Siya CMS",
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            copyrights: "2012 Kavoor Lab pvt Ltd", content: "<h1>Home page</h1>"};
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else if (q.pathname === '/about-us') {
        var theme = ThemeEngine('one-sidebar');
        var data = {title: "Siya CMS", metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            copyrights: "2012 Kavoor Lab pvt Ltd",
            content: "<h1>about us</h1>",
            leftSidebar: "left Sidebar", rightSidebar: "right Sidebar"};
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else if (q.pathname === '/contact-us') {
        var theme = ThemeEngine('two-sidebar');
        var data = {title: "Siya CMS",
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            copyrights: "2012 Kavoor Lab pvt Ltd",
            content: "<h1>contact us</h1>",
            leftSidebar: "left Sidebar",
            rightSidebar: "right Sidebar"};
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else {
        var theme = ThemeEngine('home');
        var data = {title: "Siya CMS", metaKeywords: "meta Keywords", metaDescription: "meta Description", copyrights: "2012 Kavoor Lab pvt Ltd", content: "404 Page"};
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    }
    res.end();

}).listen(8080);

