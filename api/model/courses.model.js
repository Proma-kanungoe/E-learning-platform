const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    type:{type:String, default:"online"},
    price:{type:String, required:true},
     date:{type:String},
    createdAt:{type:Date,default: new Date()}
})


module.exports = mongoose.model("Courses", coursesSchema)