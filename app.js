require('dotenv').config();

const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const { MongoClient } = require('mongodb');

const middleware = require('./middleware');

const loginRoute = require('./routes/loginRoutes');
const logoutRoute = require('./routes/logoutRoutes');
const messagesRoute = require('./routes/messagesRoutes');
const postRoute = require('./routes/postRoutes');
const profileRoute = require('./routes/profileRoutes');
const registerRoute = require('./routes/registerRoutes');
const searchRoute = require('./routes/searchRoutes');
const uploadRoute = require('./routes/uploadRoutes');

const postsApiRoute = require('./routes/api/posts');
const usersApiRoute = require('./routes/api/users');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/social-networking-app';
const SECRET = process.env.SECRET || 'secret';

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: SECRET,
        store: MongoStore.create({ client: new MongoClient(MONGODB_URL) }),
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
    })
);

app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/register', registerRoute);

app.use('/messages', middleware.requireLogin, messagesRoute);
app.use('/posts', middleware.requireLogin, postRoute);
app.use('/profile', middleware.requireLogin, profileRoute);
app.use('/search', middleware.requireLogin, searchRoute);
app.use('/uploads', middleware.requireLogin, uploadRoute);

app.use('/api/posts', postsApiRoute);
app.use('/api/users', usersApiRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle: 'Home',
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    };

    res.status(200).render('home', payload);
});

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log('Database connection successful');

        app.listen(port, () => console.log('Server listening on port ' + port));
    })
    .catch((err) => {
        console.log('database connection error ' + err);
    });
