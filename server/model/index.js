// const MongoCilent = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
// const dbName = 'test';
// function connect(callback) {
//     MongoCilent.connect(url,function(err,client) {
//         if(err) {
//             console.log('数据库连接失败')
//         } else {
//             const db = client.db(dbName);
//             callback && callback(db)
//             client.close()
//         }
//     })
// }
// module.exports = {connect}
const mongoose = require("mongoose")
const db = mongoose.connect('mongodb://123.56.68.242:27017/chatroom',(err) => {
    if(err) {
        console.log("链接失败")
    } else {
        console.log("链接成功")
    }
})
module.exports = db