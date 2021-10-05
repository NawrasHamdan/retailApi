const router = require('express').Router();
const Category = require('../models/category');

router.get('/', async (req, res, next) => {

  try {
    const data = await Category.find().exec();
    return res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  };
});

router.post('/', async (req, res, next) => {
  try {
    const category = {
      name_en: req.body.name_en,
      name_ar: req.body.name_ar,
      img: req.body.img
    }
    const result = await Category.create(category);
    return res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
})
module.exports = router;
