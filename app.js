const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const middleware = require('./middleware');

const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

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

app.listen(port, () => console.log('Server listening on port ' + port));
