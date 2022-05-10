var express = require('express');
var router = express.Router();
const AdminUser = require("../model/adminUser");
const assert = require("http-assert");
const jwt = require("jsonwebtoken");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 注册接口
router.post('/register', async(req, res, next) => {
  const data = {
    username:req.body.username,
    password:req.body.password
  }
  console.log(data)
  const user = await AdminUser.findOne({ "username": data.username }).select("+password")
  if (user) {
    res.send({
        "ErrorCode": 10000,
        "message": '用户已注册',
    })
    return
  }
  console.log(user);
  await AdminUser.create(data)
  res.send({
    "ErrorCode":0,
    "message": '注册成功',
  })
  // AdminUser.findOne({username:req.body.username}).then((result) => {
  //   console.log(result,'2312')
  //   if(result) {
  //     res.send({
  //       "ErrorCode":1,
  //       "ErrorText": '用户已经注册',
  //     })
  //   } else {
  //     var User = new AdminUser(data)
  //     User.save(data)
  //     res.send({
  //       "ErrorCode":0,
  //       "message": '注册成功',
  //     })
  //   }
  // })
  // model.connect(function(db) {
  //     db.collection('users').insertOne(data,function(err,rej){
  //         if(err) {
  //             // res.redirect('/register')
  //             console.log(err,'注册失败')
  //         } else {
  //             // res.redirect('/login')
  //             res.send ({
  //               "ErrorCode":0,
  //               "message": '注册成功',
  //             })
  //             console.log('注册成功')
  //         }
  //     })
  // })
})
// 登录接口
router.post('/login', async(req, res, next) => {
    const { username, password } = req.body;
    const user = await AdminUser.findOne({ username }).select("+password")
    if(!user) {
        res.send({ "ErrorCode": 422, "message": '用户不存在'});
        return;
    }
    const isValid = require("bcrypt").compareSync(password, user.password);
    if(!isValid) {
        res.send({ "ErrorCode": 422, "message": '密码错误'});
        return;
    }
    // 3.返回token，使用user._id和预先定义的字符串生成token
    const token = jwt.sign({ id: user._id }, 'zard1991',{ expiresIn: 60 * 60 * 24 });
    // 服务端向客户端写入cookie
    res.cookie("access_token", token,{ maxAge: 24 * 60 * 60 * 1000 })
    res.send({
      "ErrorCode":0,
      "message": '登录成功',
      "access_token": token,
      "userInfo": {
        id: user._id,
        username: req.body.username,
      }
    })
    console.log(token)
    
    // AdminUser.find(data).then((result)=>{
    //   console.log(result)
    //   if(result.length) {
    //     if(result[0].username == data.username && result[0].password == req.body.password) {
    //       res.cookie("username", result[0].username,{ maxAge: 1000 * 60 * 5 })
    //       req.session.username = data.username;
    //       res.send({
    //         "ErrorCode":0,
    //         "message": '登录成功',
    //       })
    //     } else {
    //       res.send({
    //         "ErrorCode":1,
    //         "ErrorText": '密码输入错误',
    //       })
    //     }
    //   } else {
    //     res.send ({
    //       "ErrorCode":1,
    //       "ErrorText": '您请先注册!',
    //     })
    //   }
    // })

    // model.connect(function(db) {
    //     db.collection('users').find(data).toArray(function(err,docs) {
    //         if(err) {
    //             next()
    //         } else {
    //           if(docs.length > 0) {
    //               console.log(docs,'111')
    //               if(docs[0].username == data.username && docs[0].password == req.body.password) {
    //                 res.cookie("username", docs[0].username,{ maxAge: 1000 * 60 * 5 })
    //                 console.log(req.session)
    //                 req.session.username = data.username;
    //                 // res.send ({
    //                 //     "ErrorCode":0,
    //                 //     "message": '登录成功',
    //                 // })
    //                 res.send({
    //                   "ErrorCode":0,
    //                   "message": '登录成功',
    //                 })
    //               } else {
    //                 res.send({
    //                     "ErrorCode":1,
    //                     "ErrorText": '密码输入错误',
    //                 })
    //               }
    //           } else {
    //             res.send ({
    //                 "ErrorCode":1,
    //                 "ErrorText": '您请先注册!',
    //             })
    //           }
    //         }
    //     })
    // })
});
// 获取会员列表接口
router.get('/list', async(req, res, next) => {
  console.log('list')
  let page = req.query.page || 1
  let pageSize = req.query.pageSize || 10
  const list = await AdminUser.find({}).skip((page -1) * +pageSize).limit(+pageSize);
  res.send({
    list,
    total: list.length
  })
})
// 退出登录
router.get('/loginOut',function(req,res,next) {
  console.log(req.session.username )
  req.session.username = null;
  res.send ({
    "ErrorCode":0,
    "message": '退出登录',
  })
});
module.exports = router;
