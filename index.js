const express = require('express');
const mongoose = require("mongoose");
const config = require('./common/env');
const swapRouter = require("./routes/swaps");

//setup a connection to a MongoDB instance
mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('connected', () => {
    console.log('Database Connected');
})
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
app.use(express.json());

//calls the swapConfig where the different api endpoints are defined
swapRouter.swapConfig(app);

//server listening on the specified port 
const server = app.listen(config.port, () => {
    console.log('app listening at port %s', config.port);
})

module.exports = server