const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manuel Frieß'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, name}={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forcastdata) => {
            if (error) {
                return res.send({error})
            }
            res.send({ 
                forecast: forcastdata,
                location: name,
                address: req.query.address,
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Manuel Frieß',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Manuel Frieß',
        msg: 'We can fix that!',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help artile not found',
        name: 'Manuel Frieß',
        errormsg: 'No help for you',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 440 page',
        name: 'Manuel Frieß',
        errormsg: 'Details...',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})