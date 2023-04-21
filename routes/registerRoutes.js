const express = require('express');

const User = require('../schemas/UserSchema');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).render('register');
});

router.post('/', (req, res, next) => {
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if (firstName && lastName && username && email && password) {
        User.findOne({
            $or: [{ username: username }, { email: email }],
        }).then((user) => {
            console.log(user);
        });

        console.log('hello');
    } else {
        payload.errorMessage = 'Make sure each field has a valid value.';
        res.status(200).render('register', payload);
    }
});

module.exports = router;
