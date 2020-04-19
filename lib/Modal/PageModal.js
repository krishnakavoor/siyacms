/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var sqlite = require('sqlite-sync'); //requiring
sqlite.connect('./db/siya');

var Page = {
    getAllPageList: function () {
        var query = "SELECT * from sy_page where status=1";
        return sqlite.run(query);
    },
    getPageDetail: function (id) {
        var query = "SELECT * from sy_page_content where page_id=" + id;
        return sqlite.run(query);
    },
    updatePageDetail: function (id) {
        var query = "UPDATE sy_page SET id='3', name='contact us', url='/contact-us', page_type='1', template_name='two-sidebar', created_at=NULL, modified_at=NULL, status='1' WHERE rowid ="+id;
        return sqlite.run(query);
    },
    createPageDetail: function (id) {
        var query = "SELECT * from sy_page_content where page_id=" + id;
        return sqlite.run(query);
    },
    deletePageDetail: function (id) {
        var query = "SELECT * from sy_page_content where page_id=" + id;
        return sqlite.run(query);
    }
}

module.exports = {
    getAllPageList: Page.getAllPageList,
    getPageDetail: Page.getPageDetail
}