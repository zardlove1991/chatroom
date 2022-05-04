var express = require('express');
var router = express.Router();
const Article = require("../model/article");
const assert = require("http-assert");
const { log } = require('debug');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 新增文章接口
router.post('/publish', async(req, res, next) => {
    console.log(req.body,'231')
    const data = {
      content:req.body.content,
      title:req.body.title,
      create_at:'',
    }
    // await Article.findOneAndUpdate(
    //   { title: data.title },
    //   {
    //     $inc: {
    //       id: 1 //每次自增长1
    //     }
    //   },
    //   {
    //     new: true //设置true 获取的是更新之后的值
    //   },
    // );
    await Article.create(data);
    res.send({
      "ErrorCode":0,
      "message": '发布成功',
    })
})
// 文章列表接口
router.get('/list', async(req, res, next) => {
  let page = req.query.page || 1
  let pageSize = req.query.pageSize || 10
  console.log(req.query)
  const list = await Article.find({}).skip((page -1) * +pageSize).limit(+pageSize);
  res.send({
    list,
    total: list.length
  })
})
// 文章详情接口
router.get('/detail', async(req, res, next) => {
  const data = await Article.findOne({_id: req.query._id})
  res.send({
    data
  })
})
// 文章编辑接口
router.put('/publish', async(req, res, next) => {
    console.log(req.body)
    const {content, title, _id } = req.body
    Article.updateOne({_id: _id}, {
      $set: {content: content , title: title }
    }, () => {
        res.send({
          "ErrorCode":0,
          "message": '保存成功',
        })
    });
})
module.exports = router;