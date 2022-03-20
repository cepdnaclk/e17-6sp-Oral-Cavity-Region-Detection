const express = require('express');
const app = express();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const path = require('path');
const cors=require("cors");
const fs = require('fs');
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


// import routes
const userAuthRoute = require('./routes/user_auth');
app.use("/api/auth",userAuthRoute);

const adminAuthRoute = require('./routes/admin_auth');
app.use("/api/admin/auth",adminAuthRoute);


const userRoute = require('./routes/user');
app.use("/api/user",userRoute);

const adminRoute = require('./routes/admin');
app.use("/api/admin", adminRoute);

const patientRoute = require('./routes/patient');
app.use("/api/user/patient", patientRoute);

const imageRoute = require('./routes/image');
app.use("/api/user/image",imageRoute);





// image uploads
app.use("/images",express.static(path.join(__dirname, '/images')))

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"images");
//     },
//     filename:(req,file,cb)=>{
//         cb(null, file.originalname);   
//         console.log(req.params)     
//     }
// });

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      let dest = path.join(__dirname, '/images', req.params.reg_no);
      let stat = null;
      try {
        stat = fs.statSync(dest);
      }
      catch (err) {
        fs.mkdirSync(dest);
      }
      if (stat && !stat.isDirectory()) {
        throw new Error('Directory cannot be created');
      } 
      cb(null, dest);
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname);   
        console.log(req.params)     
    }
  });


const upload = multer({storage:storage})

app.post("/api/user/uploads/:reg_no",upload.any("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})