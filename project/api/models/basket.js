const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItems = new Schema({
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    quantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    totalProductsprice: { type: Number, required: true }
});

const basketSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    totalPrice: { type: Number, required: true },
    deliveryFee: { type: Number, required: false },
    products: [orderItems]
});

const Basket = mongoose.model('Basket', basketSchema, "baskets");
module.exports = Basket;