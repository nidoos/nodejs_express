var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');




router.get('/login', (request, response) => {
    var title = 'WEB - Login';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
        `
        <form action="/auth/login_process" method = "post">
        <p><input type = "text" name = "email" placeholder = "email"></p>
        <p><input type = "password" name = "pwd" placeholder = "password"></p>
        <p><input type = "submit" value = "login"></p>
        </form>
        `, ''
    );
    response.send(html);
});

router.get('/logout', (request, response) => {
    //세션 로그아웃
    request.logOut();
    //session_destroy
    /*   request.session.destroy(function (err) {
          response.redirect('/');
      }); */
    request.session.save(function () {
        response.redirect('/');
    })
});


module.exports = router;