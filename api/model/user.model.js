const { default: mongoose, model} = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, required:true},
    name:{type:String, required:true},
    password: {type: String, required: true},
    createdAt:{type:Date, default: new Date()}
})

module.exports = { User:model("user", userSchema)}