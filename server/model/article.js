const mongoose = require("mongoose")
const schema = new mongoose.Schema(
    {
        content:{
            type: String,
        },
        create_at:{
            type:String,
            set(val) {
                return require('moment')().format("YYYY-MM-DD HH:mm:ss");
            }
        },
        author_name:{
            type:String,
        },
        title: {
            type:String,
        }
    },
    {
        //设置时间戳
        timestamps: {
            createdAt: 'created_at',
            updatedAt: "updated_at"
        }
    }
)
const Articles = mongoose.model('articles',schema)
module.exports = Articles