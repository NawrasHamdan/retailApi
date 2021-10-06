const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItems = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    // quantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    // totalProductsprice: { type: Number, required: true }
});

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    totalPrice: { type: Number, required: true },
    deliveryFee: { type: Number, required: false },
    paymentMethod: { type: String, required: false },
    products: [orderItems],
    orderStatus: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema, "orders");
module.exports = Order;