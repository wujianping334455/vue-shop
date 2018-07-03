var express = require('express');
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
    console.log(req.query);
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
    db.insertOne('goods',{
      "productId":"10004",
      "productName":"九号平衡车",
      "salePrice":"1999",
      "productImage":"九号平衡车.jpg"
      }, (result) => {
      res.json({
        status:'200',
        data:result.ops[0]
      });
    });
  });
router.route('/:id').get((req, res) => {
  console.log(req.query);
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
}

)
module.exports = router;
