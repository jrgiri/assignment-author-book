const express = require('express');
const app = express();
const routes = require('./router');
const port = 8080;
const {databaseConnect} = require('./database');

app.use('/api',routes);

databaseConnect().then(() => {
    console.log("server started at", port)
    app.listen(port)
})
