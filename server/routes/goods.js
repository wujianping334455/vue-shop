var express = require('express');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();
const db = require('../db/tools');
// 创建数据库连接
db.connect();
//  goods拦截器
router.use((req, res, next) => {
  console.log('请求时间：', new Date().toLocaleString());
  res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By",' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
//  goods路由  skip(10)跳过10条数据，limit(3)只查询三条数据 --关联的数据库 + find({属性名：{$regex:查询内容}，function(err,datas){})
router.route('/')
  .get((req, res) => {
    console.log("查询列表goods:",req.query);
    let params = req.query;
     // 删除为空的参数值
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if(!params[key]){delete params[key];}
      }
    }
    db.find('goods',params,(result)=>{
      res.json({
        status:'200',
        data:result
      });
    });
  })
  .post((req, res) => {
    console.log("创建单条goods:",req.body);
    const params = req.body;
    db.insertOne('goods',params, (result) => {
      res.json({
        status:'200',
        data:result
      });
    });
  });

// 单条记录
router.route('/:id')
  .get((req, res) => {
    console.log("查询单条goods:",req.params);
    const params = req.params;
    db.findOne('goods',{"_id" : ObjectId(params.id)},(result)=>{
      res.json({
        status:'200',
        data:result
      });
    });
  })
  .put((req, res) => {
    console.log("更新单条goods:",req.body);
    const params = req.body;
    params._id = ObjectId(req.params.id)
    db.patch('goods',params,(result)=>{
      res.json({status:'200'});
    });
  })
  .patch((req, res) => {
    const params = req.body;
    console.log("差异更新单条goods:",params);
    db.patch('goods',{"_id" : ObjectId(req.params.id)},params,(result)=>{
      res.json({
        status:'200',
        data:result
      });
    });
  })
  .delete((req, res) => {
    console.log("删除单条goods:",req.params);
    const params = req.params;
    db.delete('goods',{"_id" : ObjectId(params.id)},(result)=>{
      res.json({
        status:'200',
        data:result
      });
    });
  });
// 批量操作
router.route('/list').post((req, res) => {
  console.log("批量创建goods:",req.body);
  const params = req.body;
  db.insertMany('goods',params, (result) => {
    res.json({
      status:'200',
      data:result
    });
  });
});

module.exports = router;
