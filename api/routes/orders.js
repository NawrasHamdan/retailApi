const router = require('express').Router();
const Product = require('../models/product');
const Order = require('../models/order');
const creatError = require('http-errors');
const User = require('../models/user');


router.get('/', async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const data = await Order.find({ userId: userId }).exec();
        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    };
});

/*we will create the post order logic later*/


router.post('/confirm', async (req, res, next) => {
    try {

        const result = await Order.findOneAndUpdate({ _id: req.body.id }, {
            $set: {
                orderStatus: "confirmed"
            }
        }, {
            new: true,
            fields: 'orderStatus'
        }).exec();
        console.log(result);
        return res.send(result);
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.post('/shipped', async (req, res, next) => {
    try {

        const result = await Order.findOneAndUpdate({ _id: req.body.id }, {
            $set: { orderStatus: "shipped" }
        }, { new: true, fields: "orderStatus" }).exec();
        return res.send(result);
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.post('/returned', async (req, res, next) => {
    try {

        const result = await Order.findOneAndUpdate({ _id: req.body.id }, {
            $set: { orderStatus: "returned" }
        }, { new: true, fields: "orderStatus" }).exec();
        return res.send(result);
    } catch (error) {
        console.log(error)
        next(error);
    }
});
module.exports = router;