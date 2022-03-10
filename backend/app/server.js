const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const path = require('path');

dotenv.config();
app.use(express.json());

// import routes
const authRoute = require('./routes/auth');


app.use("/api/auth",authRoute);


app.get('/',(req, res) => {
    res.send("Welcome to server!")
});

// connect to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB"))
.catch((error) => console.log(error));

// listen on port 5000
app.listen(5000)