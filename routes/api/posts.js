const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {});

router.post('/', async (req, res, next) => {
    if (!req.body.content) {
        console.log('Content param not sent with request');
        return res.sendStatus(400);
    }

    res.status(200).send('it worked');
});

module.exports = router;
