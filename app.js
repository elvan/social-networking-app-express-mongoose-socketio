const express = require('express');
const path = require('path');

const loginRoute = require('./routes/loginRoutes');
const middleware = require('./middleware');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle: 'Home',
    };

    res.status(200).render('home', payload);
});

app.listen(port, () => console.log('Server listening on port ' + port));
