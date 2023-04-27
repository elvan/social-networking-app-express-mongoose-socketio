const express = require('express');

const Notification = require('../../schemas/NotificationSchema');

const router = express.Router();

router.get('/', async (req, res, next) => {
    Notification.find({ userTo: req.session.user._id, notificationType: { $ne: 'newMessage' } })
        .populate('userTo')
        .populate('userFrom')
        .sort({ createdAt: -1 })
        .then((results) => res.status(200).send(results))
        .catch((error) => {
            console.log(error);
            res.sendStatus(400);
        });
});
module.exports = router;
