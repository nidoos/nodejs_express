var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var app = express()

app.use(session({
    secret: 'keyboard cat', //다른이에게 노출X. 버전관리를 할 때는 소스코드에 넣으면 x
    resave: false,
    saveUninitialized: true, //세션이 필요하지 않기 전까지 세션을 작동시키지 않는다.
    store: new FileStore()
}))

app.get('/', function (req, res, next) {
    console.log(req.seesion);
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }
    res.send(`Views : ${req.session.num}`);
})

app.listen(3000, function () {
    console.log('3000!')
});