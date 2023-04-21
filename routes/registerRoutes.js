const express = require('express');

const User = require('../schemas/UserSchema');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).render('register');
});

router.post('/', async (req, res, next) => {
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    if (firstName && lastName && username && email && password) {
        var user = await User.findOne({
            $or: [{ username: username }, { email: email }],
        }).catch((error) => {
            console.log(error);
            payload.errorMessage = 'Something went wrong.';
            res.status(200).render('register', payload);
        });

        if (user == null) {
            // No user found

            var data = req.body;

            User.create(data).then((user) => {
                console.log(user);
            });
        } else {
            // User found
            if (email == user.email) {
                payload.errorMessage = 'Email already in use.';
            } else {
                payload.errorMessage = 'Username already in use.';
            }
            res.status(200).render('register', payload);
        }
    } else {
        payload.errorMessage = 'Make sure each field has a valid value.';
        res.status(200).render('register', payload);
    }
});

module.exports = router;
