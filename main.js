const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var fs = require('fs');
var compression = require('compression');
var helmet = require('helmet');
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth');

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); //bodyparser가 실행되면서 결과로 미들웨어가 들어오게된다. bodyparser가 만들어내는 미들웨어를 표현하는 표현식.
app.use(compression());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

var authData = {
  email: '111@abc.com',
  password: '111',
  nickname: 'egoing'
}

//passport : 세션을 내부적으로 사용하기 때문에 express 세션을 활성화시키는 코드 다음에 passport가 등장해야한다.
//passport 요구
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

//app.use() : express에 미들웨어설치
app.use(passport.initialize());
//passport는 내부적으로 세션사용할것
app.use(passport.session());


//세션 처리방법
passport.serializeUser(function (user, done) {
  //done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  /* User.findById(id, function (err, user) {
    done(err, user);
  }); */
});

//로그인시도할 때 성공하는 지 결정
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'pwd'
  },
  function (username, password, done) {
    console.log('LocalStrategy', username, password);
    if (username === authData.email) {
      console.log(1);
      if (password === authData.password) {
        console.log(2);
        return done(null, authData);
      } else {
        console.log(3);
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
    } else {
      console.log(4);
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }
  }
));

//사용자가 로그인했을 때 passport가 로그인 데이터를 처리하기 위한 코드
app.post('/auth/login_process',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  }));




app.get('*', (request, response, next) => {
  fs.readdir('./data', (error, filelist) => {
    request.list = filelist;
    next();
  });
});// get방식으로 들어오는 요청에 대해서만 파일목록을 가져옴

// /topic 으로 시작하는 주소들에게 topicRouter미들웨어를 적용
app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

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