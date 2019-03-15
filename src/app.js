const path = require('path');

const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shahriar Ayoubi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Shahriar Ayoubi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Shahriar Ayoubi',
        message: 'This is a sample help message.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'An address must be supplied!'
        });
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send({ error });
            }
        
            res.send({
                location: location,
                forecast: data,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    console.log(req.query.color);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('page404', {
        title: 'Error 404',
        name: 'Shahriar Ayoubi',
        message: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('page404', {
        title: 'Error 404',
        name: 'Shahriar Ayoubi',
        message: 'Page not found!'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Listening on port ${port}.......`)});