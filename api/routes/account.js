const router = require("express").Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createError = require('http-errors');
const { loginValidator, registerValidator } = require('../helpers/Joi_validation');
const { signAccessToken, singRefreshToken, verfiyRefreshToken } = require('../helpers/jwt_helper');

router.post('/register', async (req, res, next) => {

    try {
        //validate entry
        const validate = await registerValidator.validateAsync(req.body);
        const isExists = await User.findOne({ email: validate.email }).exec();
        if (isExists) { throw createError.Conflict(`email is already used`) };
        const hash = await bcrypt.hash(validate.password, saltRounds);
        validate.password = hash;
        const result = await User.create(validate);
        return res.send(`user has been created ${result}`);

    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        //validate entry using Joi helper module
        const user = await loginValidator.validateAsync(req.body);
        //find user form database
        const result = await User.findOne({ email: user.email }).exec();
        //return errror 
        if (!result) return next(createError.Unauthorized(`invalid login credentials`));
        //compare user password with database password
        const login = await bcrypt.compare(user.password, result.password);
        //login user and send him the token
        if (login === true) {
            const Token = await signAccessToken(result._id);
            const refreshToken = await singRefreshToken(result._id)
            return res.send({ Token, refreshToken, userId: result._id.toString() });
        }
        //blyat user
        return next(createError.Unauthorized(`invalid login credentials`));
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
});

router.post('/refresh-token', async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken;
        const routedRequestUserid = req.body.userId;
        let userId;
        verfiyRefreshToken(refreshToken, routedRequestUserid, (err, userId) => {
            userId = userId;
            console.log(userId);

        });


        const Token = await signAccessToken(userId);
        const newRefreshToken = await singRefreshToken(userId);
        return res.send({ Token: Token, refreshToken: newRefreshToken });
    } catch (error) {
        next(error);
    }
});

module.exports = router;