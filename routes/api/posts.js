const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {});

router.post('/', async (req, res, next) => {
    res.status(200).send('it worked');
});

module.exports = router;
