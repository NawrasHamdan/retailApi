const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name_en: {type:String , required:true,minlength:2,maxlength:32},
    name_ar : {type:String , required:false,minlength:2,maxlength:32},
    img : {type:String},
    products : [{type:Schema.Types.ObjectId,required:false,ref:"Product"}]
});

const Category = mongoose.model('Category',categorySchema,"categories");

module.exports= Category;