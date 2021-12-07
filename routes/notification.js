//import express
const express = require('express');


//initialize router
const router = express.Router();

//initialize fs
const fs = require('fs');

const list_of_symbols = [
    "GOLD",
    "XAUUSD",
    "AUDCAD",
    "AUDCHF",
    "AUDJPY",
    "AUDNZD",
    "AUDUSD",
    "CADCHF",
    "CADJPY",
    "CHFJPY",
    "EURAUD",
    "EURCAD",
    "EURCHF",
    "EURGBP",
    "EURJPY",
    "EURNZD",
    "EURUSD",
    "GBPAUD",
    "GBPCAD",
    "GBPCHF",
    "GBPJPY",
    "GBPUSD",
    "NZDCAD",
    "NZDJPY",
    "NZDUSD",
    "USDCAD",
    "USDCHF",
    "USDJPY",
    "XAUUSD",
]


router.get('/', (req, res) => {
    fs.readFile('./db/notification.json', (err, data) => {
        let notifications = JSON.parse(data)
        if (err) {
            return res.send(err);
        } else {
            return res.send(notifications);
        }
    });
})

router.post('/', (req, res) => {
    var notification = req.body.notification;
    fs.readFile('./db/notification.json', (err, data) => {
        let notificationList
        let hasSymbol = false
        let hasDirection = false
        let hasPrices = false


        notificationList = JSON.parse(data)

        for (var i = 0; i < list_of_symbols.length; i++) {
            var tempSymbol = list_of_symbols[i];

            //tempsymbol to lower case
            tempSymbol = tempSymbol.toLowerCase();

            //if tempSymbol is present in the sentence, set symbol to tempSymbol //
            if (notification.toLowerCase().includes(tempSymbol)) {
                hasSymbol = true
            }
        }

        if (notification.toLowerCase().includes("buy") || notification.toLowerCase().includes("sell")) {
            hasDirection = true
        }

        var numbers = notification.match(/\d+\.?\d*/g);

        if (numbers != null) {
            if (numbers.length >= 3) {
                hasPrices = true
            }
        }
        console.log(hasPrices)

        console.log(notificationList)

        if (hasSymbol && hasDirection && hasPrices) {
            notificationList.push(notification)
        } else {
            console.log("Not a Signal")
        }

        fs.writeFile('./db/notification.json', JSON.stringify(notificationList), (err) => {
            if (err) {
                console.log(err)
            }
            return res.send(notificationList)
        })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    let notificationList
    fs.readFile('./db/notification.json', (err, data) => {
        notificationList = JSON.parse(data)
        //remove index from notificationList equal to id
        notificationList.splice(id, 1)

        fs.writeFile("./db/notification.json", JSON.stringify(notificationList), (err) => {
            if (err) {
                console.log(err)
            }
            return res.send(notificationList)
        })
    })
})


//export router
module.exports = router;