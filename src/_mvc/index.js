const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const app = module.exports = express();

//Set our defualt template engine to ejs
app.set('view engine', 'ejs');

//Set views for errors and 404 pages
app.set('view', path.join(__dirname, 'views'));

//Define a custom res message method
app.response.message = (msg) => {
    //ref 'req.session' via this.req ref
     let msgSession = this.request.session;
     //Add the message to an array
     msgSession.messages = msgSession || [];
     msgSession.push(msg)
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

//Error page
//response.status(500).render('error')

//Error 500
app.use((req, res, next) => {
    res.status(500).render('error', {url: req.originalUrl})
});

//404 error
app.use((req, res, next) => {
    res.status(404).render('404', {url: req.originalUrl})
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});