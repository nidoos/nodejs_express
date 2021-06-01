var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');


var authData = {
    email: '111@abc.com',
    password: '111',
    nickname: 'egoing'
}

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

/* router.post('/login_process', (request, response) => {
    var post = request.body;
    var email = post.email;
    var password = post.pwd;
    if (email === authData.email && password === authData.password) {
        request.session.is_logined = true;
        request.session.nickname = authData.nickname;

        //세션객체에 있는 데이터를 세션스토어에 바로 반영. 반영작업이 끝나면 콜백함수 호출
        request.session.save(function () {
            response.redirect(`/`);
        });

    } else {
        response.send('Who?');
    }
}); */

router.get('/logout', (request, response) => {
    //session_destroy
    request.session.destroy(function (err) {
        response.redirect('/');
    });
});


module.exports = router;