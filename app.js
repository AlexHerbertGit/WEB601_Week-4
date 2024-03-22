//Import the path library
const path = require('path');

//Import express
const express = require('express');

//Import zippity-do-dah library
const zipdb = require('zippity-do-dah');

//Import the forcast library
const forcastIo = require('forecastio');

//Init the instance of express app
const app = express();

//Init instance of forecastio library with unique api key
const weather = new forcastIo("Your forecastIo api key")

//Establish a public path as dir to display from.
app.use(express.static(path.resolve(__dirname, "public")))

//Establish the views directory path
app.use('views', path.resolve(__dirname, "views"))

//Establish express view engine that supports the ejs format
app.set('view engine', 'ejs')

//Make root renders for index.ejs
app.get("/", (req, res) => {
    res.render("index")
})

//Regex to filter through the api call
app.get(/^\/(\d{5})$/, (req, res, next) => {
    //Provide variables to use as arguements in .forecast() method
    const zipcode = req.params[0]
    const location = zipdb.zipcode(zipcode)

    if(!location.zipcode) {
        next()
        return
    }
    //Callback for forecast() method with args stated below
    weather.forecast(latitude, longitude, (err, data) => {
        //Error
        if(err) {
            next()
            return
        }
        //Format and return a res as json
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        }) 
    })
})

//Create a 404 view page render
app.use((req, res) => {
    req.statusCode(404).render("404")
})

//Simple server method
app.listen(3000)
