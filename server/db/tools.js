const MongoClient = require('mongodb').MongoClient;
 
var client;
var dbName = 'vue-shop';
module.exports = {
    // 连接数据库
    connect() {
        MongoClient.connect(
            'mongodb://localhost:27017',
            (err, _client) => {
                if (err) throw err;
                client = _client;
                console.log('成功连接数据库');
            }
        );
    },
    // 关闭数据库
    close () {
        client.close();
    },
    // 插入数据
    insertOne(collectionName, model, success) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // 如果没有对应的db和collection，自动创建
        collection.insertOne(model, (err, result) => {
            if (err) throw err;
            success(result);
        });
    },
    // 批量插入
    insertMany(collectionName, model, success){
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertMany([
            {
              "productId":"10031",
              "productName":"小米空气净化器 2",
              "salePrice":"699",
              "productImage":"小米空气净化器 2.jpg"
            },
            {
              "productId":"10032",
              "productName":"米家空气净化器Pro",
              "salePrice":"1499",
              "productImage":"米家空气净化器Pro.jpg"
            },
            {
              "productId":"10033",
              "productName":"米家PM2.5检测仪",
              "salePrice":"399",
              "productImage":"米家PM2.5检测仪.jpg"
            },
            {
              "productId":"10024",
              "productName":"九号平衡车",
              "salePrice":"1999",
              "productImage":"九号平衡车.jpg"
            },
            {
              "productId":"10035",
              "productName":"小米路由器 3",
              "salePrice":"139",
              "productImage":"小米路由器 3.jpg"
            },
            {
              "productId":"10036",
              "productName":"米家压力 IH 电饭煲",
              "salePrice":"999",
              "productImage":"米家压力 IH 电饭煲.jpg"
            },
            {
              "productId":"10037",
              "productName":"米家IH电饭煲",
              "salePrice":"399",
              "productImage":"米家IH电饭煲.jpg"
            },
            {
              "productId":"10028",
              "productName":"米家恒温电水壶",
              "salePrice":"199",
              "productImage":"米家恒温电水壶.jpg"
            },
            {
              "productId":"10039",
              "productName":"米家小白智能摄像机",
              "salePrice":"399",
              "productImage":"米家小白智能摄像机.jpg"
            },
            {
              "productId":"10040",
              "productName":"Yeelight床头灯",
              "salePrice":"249",
              "productImage":"Yeelight床头灯.jpg"
            }], (err, result) => {
            if (err) throw err;
            success(result);
        });
    },
    // 查
    find(collectionName, model, success) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // 参数可以不传，也可以传一个对象，或者一个字符串
        collection.find(model).toArray((err, docs) => {
            if (err) throw err;
            success(docs);
        });
    },
    // 查
    findOne(collectionName, model, success) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // 参数可以不传，也可以传一个对象，或者一个字符串
        collection.findOne(model,(err, docs) => {
            if (err) throw err;
            success(docs);
        });
    },
    // 更新
    put(collectionName,model, success) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.save(model,(err, docs) => {
            if (err) throw err;
            success(docs);
        });
    },
    // 差异更新
    patch(collectionName,conditions,model, success) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.update(conditions,model,(err, docs) => {
            if (err) throw err;
            success(docs);
        });
        // db.user.update({sex:{$gt:"1"}},{$set:{tel:"132"}});
    },
    // 删除
    delete(collectionName, model, success) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.remove(model,(err, docs) => {
            if (err) throw err;
            success(docs);
        });
    }
};