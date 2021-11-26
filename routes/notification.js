//import express
const express = require('express');


//initialize router
const router = express.Router();

//initialize fs
const fs = require('fs');


router.get('/', (req, res) => {
    fs.readFile('./db/notification.txt', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data.toString());
        }
    });
})

router.post('/', (req, res) => {
    var notification = req.body.notification;
    fs.writeFile('./db/notification.txt', notification, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send('success');
        }
    });

})


//export router
module.exports = router;