const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var fs = require('fs');
var compression = require('compression');
var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); //bodyparser가 실행되면서 결과로 미들웨어가 들어오게된다. bodyparser가 만들어내는 미들웨어를 표현하는 표현식.
app.use(compression());
app.get('*', (request, response, next) => {
  fs.readdir('./data', (error, filelist) => {
    request.list = filelist;
    next();
  });
});// get방식으로 들어오는 요청에 대해서만 파일목록을 가져옴

// /topic 으로 시작하는 주소들에게 topicRouter미들웨어를 적용
app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use((request, response, next) => {
  response.status(404).send('Sorry cant find that!');
});

app.use(function (err, request, response, next) {
  console.error(err.stack)
  response.status(500).send('Something broke!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});