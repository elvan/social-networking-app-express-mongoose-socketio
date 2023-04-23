const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    var payload = {
        pageTitle: req.session.user.username,
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        profileUser: req.session.user,
    };

    res.status(200).render('profilePage', payload);
});

module.exports = router;
