const express = require('express');
const app = express();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const path = require('path');
const cors=require("cors");
const connectDB = require('./configurations/db-config')
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors())

// connect to the db
connectDB();

// listen on port 5000
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});


app.get('/',(req, res) => {
    res.send("Welcome to server!")
});

// local storage
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
});

const upload = multer({storage:storage})

app.use("/images",express.static(path.join(__dirname, '/localStorage')))

app.post("/api/upload",upload.array("photos",50),(req,res)=>{
    res.status(200).json("Files has been uploaded");
})


// import routes
const userAuthRoute = require('./routes/user_auth');
app.use("/api/auth",userAuthRoute);

const adminAuthRoute = require('./routes/admin_auth');
app.use("/api/admin/auth",adminAuthRoute);


const patientroute = require('./routes/patient');
app.use("/api/patient" , patientroute);

const userRoute = require('./routes/user');
app.use("/api/user",userRoute);

const adminRoute = require('./routes/admin');
app.use("/api/admin", adminRoute);
