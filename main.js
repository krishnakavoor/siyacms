/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var http = require('http');
var fs = require('fs');
var url = require('url');

var themeName = 'default';

var ThemeEngine = function (template) {
    var layout = fs.readFileSync('theme/' + themeName + '/' + template + '.html');
    layout = layout.toString();
    var re = /{!([^!}]+)?!}/g, match;
    while (match = re.exec(layout)) {
        var header = fs.readFileSync('theme/' + themeName + '/html/' + match[1] + '.html');
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
            content: "about us",
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

/**
 * > git clone https://krishnakavoor@github.com/krishnakavoor/siyacms.git

 * https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
 */