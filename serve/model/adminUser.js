const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema({
    username:{
        type: String,
        unique: true //字段是否唯一
    },
    password:{
        type: String,
        select:false, //查表时不带出password字段
        set(val) {
            // 使用bcrypt进行散列保存 12代表加密程度
            return require('bcrypt').hashSync(val,12);
        }
    },
    create_at:{
		type:String,
		set() {
            return require('moment')().format("YYYY-MM-DD HH:mm:ss");
        }
	}
})
const Users = mongoose.model('users',schema)
module.exports = Users