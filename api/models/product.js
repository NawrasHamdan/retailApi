const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name_en: { type: String, required: true, minlength: 2, maxlength: 32 },
    name_ar: { type: String, required: false, minlength: 2, maxlength: 32 },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
    img: { type: String },
    description_en: { type: String, required: false, minlength: 2, maxlength: 64 },
    description_ar: { type: String, required: false, minlength: 2, maxlength: 64 },
    price: { type: Number, min: 001, required: true },
    promotion : {type:Schema.Types.ObjectId,required:false , ref:"Promotion"},
    inStock: { type: Number, min: 0 },
    status: { type: Boolean, required: true, default: true }
});

const Product = mongoose.model('Product', productSchema, "products");
module.exports = Product;