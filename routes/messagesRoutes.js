const express = require('express');
const mongoose = require('mongoose');

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
    var isValidId = mongoose.isValidObjectId(chatId);

    var payload = {
        pageTitle: 'Chat',
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    };

    if (!isValidId) {
        payload.errorMessage = 'Chat does not exist or you do not have permission to view it.';
        return res.status(200).render('chatPage', payload);
    }

    var chat = await Chat.findOne({ _id: chatId, users: { $elemMatch: { $eq: userId } } }).populate(
        'users'
    );

    if (chat == null) {
        // Check if chat id is really user id
        var userFound = await User.findById(chatId);

        if (userFound != null) {
            // get chat using user id
        }
    }

    if (chat == null) {
        payload.errorMessage = 'Chat does not exist or you do not have permission to view it.';
    } else {
        payload.chat = chat;
    }

    res.status(200).render('chatPage', payload);
});

module.exports = router;
