const router = require("express").Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

User.findOneAndRemove({ emil: "blyat@blyat.blyat" });

router.post('/register', async (req, res, next) => {

    try {

        const user = ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        });

        const isExists = await User.findOne({ email: user.email, phoneNumber: user.phoneNumber }).exec();
        if (isExists) { return res.send('a user with this email / phone number already exists'); };
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash;
        const result = await User.create(user);
        res.send(`user has been created ${result}`);

    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = {
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        };
        //find user form database
        const result = await User.findOne({ email: user.email, phoneNumber: user.phoneNumber }).exec();
        if (!result) return res.send("invalid login credentails");
        //compare user password with database password
        const login = await bcrypt.compare(user.password, result.password);
        //login user
        const fullName = result.firstName + " " + result.lastName;
        if (login) return res.send(`noice blyat ${login}\n and welcome to you ${fullName}`);
        //blyat user
        return res.send(`invalid credentials dude!! ${login}`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;