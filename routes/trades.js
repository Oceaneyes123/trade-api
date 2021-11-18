//import express
const express = require('express');


//initialize router
const router = express.Router();

let trades = [
   {
    "id": 0,
    "symbol": "GOLD",
    "direction": "BUY",
    "entryPrice": 1820,
    "stopLoss": 1810,
    "recover": false
   }
]

let id = 1

let message = ""


//all routes start with /trades
//route to get all trades
router.get('/', (req, res) => {
    let lastTrade = trades[trades.length - 1]
    if("recover" in lastTrade){
        message = lastTrade.id + "/" + lastTrade.symbol + "/" + lastTrade.direction + "/" + lastTrade.entryPrice + "/" + lastTrade.stopLoss + "/" + lastTrade.recover
        res.send(message)
    }
})

//route to get all trades
router.get('/all', (req, res) => {
    res.send(trades)
})

//route to post trades
router.post('/', (req, res) => {
    const trade = {
        id: id++,
        symbol: req.body.symbol,
        direction: req.body.direction,
        entryPrice: req.body.entryPrice,
        stopLoss: req.body.stopLoss,
        recover: req.body.recover
    }
    trades.push(trade)
    res.send(trades);
})

//router to delete trades
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    trades = trades.filter(trade => trade.id !== parseInt(id))
    res.send(trades)
})

//export router
module.exports = router;