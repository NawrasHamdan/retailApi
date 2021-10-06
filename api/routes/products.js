const router = require('express').Router();
const Product = require('../models/product');
const Category = require('../models/category');


router.get('/', async (req, res, next) => {
    try {
        const data = await Product.find().exec();
        return res.send(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const product = {
            name_en: req.body.name_en,
            name_ar: req.body.name_ar,
            img: req.body.img,
            description_en: req.body.description_en,
            description_ar: req.body.description_ar,
            price: req.body.price,
            inStock: req.body.inStock,
            category: req.body.category
        }
        const result = await Product.create(product);
        await Category.updateOne({ _id: result.category }, {
            $push: {
                products: result._id
            }
        })
        res.send(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
})
module.exports = router;
