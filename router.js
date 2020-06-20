var express = require('express');
var app = express();
const {getAuthorsAward, getAuthorsYear, getAllSelling, getHighPrice} = require('./database');

app.get('/authorsAward/:award', async (req, res) => {
    let authors = await getAuthorsAward(JSON.parse(req.params.award));
    let result = authors.length == 0 ? { message : "No authors available with this numbers of award or above" } : authors;
    res.send(result);
})

app.get('/authorsYear/:year', async (req, res) => {
    let authors = await getAuthorsYear(JSON.parse(req.params.year));
    let result = authors.length == 0 ? { message : "No authors available with this year or above" } : authors;
    res.send(result);
})

app.get('/totalSelling', async (req, res) => {
    let totalSelling = await getAllSelling();
    let result = totalSelling.length == 0 ? { message : "Data not available" } : totalSelling;
    res.send(result);
})

app.get('/highPrice/:birthDate/:totalPrice', async (req, res) => {
    let highPrice = await getHighPrice(req.params.birthDate, JSON.parse(req.params.totalPrice));
    let result = highPrice.length == 0 ? { message : "Data not available" } : highPrice;
    res.send(result);
})

module.exports = app;