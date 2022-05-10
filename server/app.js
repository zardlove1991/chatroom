var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require("jsonwebtoken");

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var articleRouter = require('./routes/article');
var session = require('express-session');

const Socket = require("ws");
var app = express();

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials',"true")
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Authorization");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session配置
app.use(session({
  secret: 'zaqwsxsy1996122.', // 可以随便改的
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 5 }  // 在服务端使用session时,会向客户端写入cookie,所以这里要指定一个cookie的有效期(即用户登陆多久是有效的)这里是五分钟
}))

 // 登录拦截(当进入系统的时候)
 app.all('*',async(req,res,next) => {
  // var user = req.session.username;
  const token = String(req.headers.authorization || "").split(" ").pop();
  const isValid = jwt.verify(token, 'zard1991',(err,data) => data)
  console.log(req.headers)
  var path = req.path;
  console.log("token",token);
  console.log(req.path)
  // 如果是进的登录页或注册页,我们不拦截
  if(path != '/users/login' && path != '/users/register'){
    console.log(token, isValid, '12312')
    if(!isValid){
      res.send ({
        "ErrorCode": 401,
        "ErrorText": 'token过期',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/article', articleRouter);
app.get('/new', function (req, res) {
  // res.cookie("username", "dsa",{ maxAge: 1000 * 60 * 5 })
  res.render('new', { title: 'new' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

;((Socket) => {
  const server = new Socket.Server({port : 8080 })
  const init = () =>{
      bindEvent();
  }
  function bindEvent() {
      server.on('open', handleOpen);
      server.on('close', handleClose);
      server.on('error', handleError);
      server.on('connection', handleConnection)
  }
  function handleOpen () {
      console.log('webSocket opened')
  }
  function handleClose() {
      console.log('webSocket closed')
  }
  function handleError() {
      console.log('webSocket error')
  }
  function handleConnection(ws) {
      console.log('webSocket connected')
      ws.on('message', handleMessage)
  }
  function handleMessage(msg) {
    msg = msg.toString('utf-8')
    server.clients.forEach((c) => {
      c.send(msg)
    })
  }
  init()
})(Socket)

module.exports = app;
