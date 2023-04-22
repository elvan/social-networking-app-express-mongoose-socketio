const express = require('express');

const Post = require('../../schemas/PostSchema');
const User = require('../../schemas/UserSchema');

const router = express.Router();

router.get('/', (req, res, next) => {
    Post.find()
        .populate('postedBy')
        .sort({ createdAt: -1 })
        .then((results) => res.status(200).send(results))
        .catch((error) => {
            console.log(error);
            res.sendStatus(400);
        });
});

router.post('/', async (req, res, next) => {
    if (!req.body.content) {
        console.log('Content param not sent with request');
        return res.sendStatus(400);
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user,
    };

    Post.create(postData)
        .then(async (newPost) => {
            newPost = await User.populate(newPost, { path: 'postedBy' });

            res.status(201).send(newPost);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(400);
        });
});

router.put('/:id/like', async (req, res, next) => {
    var postId = req.params.id;
    var userId = req.session.user._id;

    var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    var option = isLiked ? '$pull' : '$addToSet';

    // Insert user like
    req.session.user = await User.findByIdAndUpdate(
        userId,
        { [option]: { likes: postId } },
        { new: true }
    ).catch((error) => {
        console.log(error);
        res.sendStatus(400);
    });

    // Insert post like
    var post = await Post.findByIdAndUpdate(
        postId,
        { [option]: { likes: userId } },
        { new: true }
    ).catch((error) => {
        console.log(error);
        res.sendStatus(400);
    });

    res.status(200).send(post);
});

module.exports = router;
