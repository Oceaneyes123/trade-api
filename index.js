//import express
const express = require('express');

// import routes
const tradeRoutes = require('./routes/trades.js');
const notificationRoutes = require('./routes/notification.js');

//initialize express
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

//enable cors
app.use(function(req, res, next) {
    //use cors to allow cross origin resource sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();  
})

//use routes
app.use('/trades', tradeRoutes);
app.use('/notification', notificationRoutes);

//add routes get
app.get('/', (req, res) => {
    res.send('This is an API for Trading - jezreldavesondia');
})

//listen to port
//initialize port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`Running Server ${PORT}` )})