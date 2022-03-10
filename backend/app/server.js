const express = require('express');
const app = express();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const path = require('path');
const connectDB = require('./configurations/db-config')
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());

// connect to the db
connectDB();

// listen on port 5000
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});


app.get('/',(req, res) => {
    res.send("Welcome to server!")
});


// import routes
const authRoute = require('./routes/auth');
app.use("/api/auth",authRoute);
