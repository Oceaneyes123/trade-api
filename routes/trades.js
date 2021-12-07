//import express
const express = require("express");

//initialize router
const router = express.Router();

//initialize fs
const fs = require("fs");

let trades;
let news;

let id = 0;

let message = "";

//all routes start with /trades
//route to get all trades
router.get("/", (req, res) => {
    //fs read trades.json
    fs.readFile("./db/trades.json", (err, data) => {
        trades = JSON.parse(data);

        let lastTrade = trades[trades.length - 1];
        console.log(lastTrade);
        if ("recover" in lastTrade) {
            message =
                lastTrade.id +
                "/" +
                lastTrade.symbol +
                "/" +
                lastTrade.direction +
                "/" +
                lastTrade.entryPrice +
                "/" +
                lastTrade.stopLoss +
                "/" +
                lastTrade.recover +
                "/" +
                lastTrade.inProfit;
            return res.send(message);
        }

        if ("command" in lastTrade) {
            message =
                lastTrade.id +
                "/" +
                lastTrade.command +
                "/" +
                lastTrade.direction +
                "/" +
                lastTrade.symbol;
            return res.send(message);
        }

        if (!("recover" in lastTrade) || !("command" in lastTrade)) {
            return res.send("NO DATA AVAILABLES");
        }
    });
});

//route to get all trades
router.get("/all", (req, res) => {
    fs.readFile("./db/trades.json", (err, data) => {
        trades = JSON.parse(data);
        return res.send(trades);
    });
});

router.get("/news", (req, res) => {
    fs.readFile("./db/news.json", (err, data) => {
        news = JSON.parse(data);
        return res.send(news);
    });
});

//route to post trades
router.post("/", (req, res) => {
    fs.readFile("./db/trades.json", function (err, data) {
        let trade;
        trades = JSON.parse(data);

        if ("recover" in req.body) {
            trade = {
                id: trades[trades.length - 1].id + 1,
                symbol: req.body.symbol,
                direction: req.body.direction,
                entryPrice: req.body.entryPrice,
                stopLoss: req.body.stopLoss,
                recover: req.body.recover,
                inProfit: req.body.inProfit,
            };
        } else {
            trade = {
                id: trades[trades.length - 1].id + 1,
                command: req.body.command,
                direction: req.body.direction,
                symbol: req.body.symbol,
            };
        }
        trades.push(trade);
        fs.writeFile("./db/trades.json", JSON.stringify(trades), (err) => {
            if (err) {
                console.log(err);
            }
            return res.send(trades);
        });
    });
});

//router to delete trades
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile("./db/trades.json", (err, data) => {
        trades = JSON.parse(data);
        trades = trades.filter((trade) => trade.id !== parseInt(id));
        fs.writeFile("./db/trades.json", JSON.stringify(trades), (err) => {
            if (err) {
                console.log(err);
            }
            return res.send(trades);
        });
    });
});

router.get("/reset", (req, res) => {
    console.log("should reset");
    trades = [{
        id: 0,
    }, ];
    fs.writeFile("./db/trades.json", JSON.stringify(trades), (err) => {
        if (err) {
            console.log(err);
        }
        return res.send(trades);
    });
});

//export router
module.exports = router;