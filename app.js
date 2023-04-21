require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const middleware = require('./middleware');

const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/social-networking-app';

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

app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle: 'Home',
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
