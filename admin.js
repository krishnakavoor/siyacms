/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var http = require('http');
var fs = require('fs');
var url = require('url');


var sqlite = require('sqlite');
var db =  sqlite.open('./db/siya',{ Promise });
var categories=db.all('SELECT * FROM sy_pages');
console.log(categories);


//const db = require('better-sqlite3')('./db/siya', { verbose: console.log });
 
//const row = db.prepare('SELECT * FROM pages');
//console.log(row);

//varsha bandharkar

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

var themeName = 'admin';
var projectUrl = 'http://localhost:9090';
var genericData = {
    title: "Siya CMS Admin",
    projectUrl: projectUrl,
    themeName: themeName,
    copyrights: "2012 Kavoor Lab pvt Ltd"
};

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



function test(cb) {
    db.serialize(() => {
        db.all('select * from sy_page', (err, row) => {
            if (err) {
                console.error(err.message);
            }
            return cb(row);
        });
    });

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
        var content = '';


        var row = cb();
        console.log(row)

        var pageData = {
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            content: content};
        var data = Object.assign(genericData, pageData);
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else if (q.pathname === '/menu') {
        var theme = ThemeEngine('menu');
        var pageData = {
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            content: "<h1>about us</h1>",
            leftSidebar: "left Sidebar", rightSidebar: "right Sidebar"};
        var data = Object.assign(genericData, pageData);
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else if (q.pathname === '/contact-us') {
        var theme = ThemeEngine('contact-us');
        var pageData = {
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            content: "<h1>contact us</h1>",
            leftSidebar: "left Sidebar",
            rightSidebar: "right Sidebar"};
        var data = Object.assign(genericData, pageData);
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else if (q.pathname === '/news-letter') {
        var theme = ThemeEngine('news-letter');
        var pageData = {
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            content: "<h1>contact us</h1>",
            leftSidebar: "left Sidebar",
            rightSidebar: "right Sidebar"};
        var data = Object.assign(genericData, pageData);
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else if (q.pathname === '/login') {
        var theme = ThemeEngine('login');
        var pageData = {
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            content: "<h1>contact us</h1>",
            leftSidebar: "left Sidebar",
            rightSidebar: "right Sidebar"};
        var data = Object.assign(genericData, pageData);
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else if (q.pathname === '/category') {
        var theme = ThemeEngine('category');
        var pageData = {
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            content: "<h1>contact us</h1>",
            leftSidebar: "left Sidebar",
            rightSidebar: "right Sidebar"};
        var data = Object.assign(genericData, pageData);
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else if (q.pathname === '/api/newsletter/') {

        /*  var theme = ThemeEngine('two-sidebar');
         var pageData = {
         metaKeywords: "meta Keywords",
         metaDescription: "meta Description",
         content: "<h1>contact us</h1>",
         leftSidebar: "left Sidebar",
         rightSidebar: "right Sidebar"};
         var data = Object.assign(genericData, pageData);
         var template = TemplateEngine(theme, data);
         res.write(template);
         res.end();*/

        res.redirect("https://google.com/");
    } else {
        var theme = ThemeEngine('home');
        var pageData = {
            metaKeywords: "404 Page",
            metaDescription: "404 Page",
            content: "404 Page"};
        var data = Object.assign(genericData, pageData);
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    }
    res.end();

}).listen(9090);

