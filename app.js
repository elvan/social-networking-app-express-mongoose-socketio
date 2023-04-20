const express = require('express');

const middleware = require('./middleware');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle: 'Home',
    };

    res.status(200).render('home', payload);
});

app.listen(port, () => console.log('Server listening on port ' + port));
