const express = require('express');

const router = express.Router();

router.put('/:userId/follow', async (req, res, next) => {
    res.status(200).send('Shrek');
});

module.exports = router;
