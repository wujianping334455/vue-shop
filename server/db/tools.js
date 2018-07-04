const MongoClient = require('mongodb').MongoClient;
 
var client;
var dbName = 'vue-shop';
module.exports = {
    // 连接数据库--db.user.insertMany([{},{},{}]);
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