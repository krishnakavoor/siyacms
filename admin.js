/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var sqlite = require('sqlite-sync'); //requiring
sqlite.connect('./db/siya');
var ThemeEngine = require("./lib/ThemeEngine.js");
var TemplateEngine = require("./lib/ThemplateEngine.js");
var Page = require("./lib/Modal/PageModal.js");



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
//name //slug //page_type //template_name //status

    //htmls
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (q.pathname === '/') {
        var theme = ThemeEngine('home', themeName);
        var page = Page.getAllPageList();
        var content = "";
        page.forEach(element =>
            content += "<tr><td>" + element.id + "</td><td>" + element.url + "</td><td>" + element.name + "</td><td><a href='page/edit?pageId="+element.id+"&type=edit' onclick='Page.edit()'>Edit</a></td><td><a href='page/edit?pageId="+element.id+"&type=edit' onclick='Page.delete("+element.id+")'>Delete</a></td></tr>");
        var pageData = {
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            content: content};
        var data = Object.assign(genericData, pageData);
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();
    } else if (q.pathname === '/page/edit') {
       /* var theme = ThemeEngine('menu', themeName);
        var pageData = {
            metaKeywords: "meta Keywords",
            metaDescription: "meta Description",
            content: "<h1>about us</h1>",
            leftSidebar: "left Sidebar", rightSidebar: "right Sidebar"};
        var data = Object.assign(genericData, pageData);
        var template = TemplateEngine(theme, data);
        res.write(template);
        res.end();*/
        
        
        
        
    } else if (q.pathname === '/menu') {
        var theme = ThemeEngine('menu', themeName);
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
        var theme = ThemeEngine('contact-us', themeName);
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
        var theme = ThemeEngine('news-letter', themeName);
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
        var theme = ThemeEngine('login', themeName);
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
        var theme = ThemeEngine('category', themeName);
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
        var theme = ThemeEngine('home', themeName);
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

