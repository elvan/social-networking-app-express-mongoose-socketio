const express = require('express');

const Chat = require('../schemas/ChatSchema');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).render('inboxPage', {
        pageTitle: 'Inbox',
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    });
});

router.get('/new', (req, res, next) => {
    res.status(200).render('newMessage', {
        pageTitle: 'New message',
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    });
});

router.get('/:chatId', async (req, res, next) => {
    var userId = req.session.user._id;
    var chatId = req.params.chatId;

    var chat = await Chat.findOne({ _id: chatId, users: { $elemMatch: { $eq: userId } } }).populate(
        'users'
    );

    if (chat == null) {
        // Check if chat id is really user id
    }

    res.status(200).render('chatPage', {
        pageTitle: 'Chat',
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        chat: chat,
    });
});

module.exports = router;
