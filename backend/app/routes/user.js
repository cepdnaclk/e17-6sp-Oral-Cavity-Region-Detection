const router = require('express').Router();
const authenticateToken = require('../middlewares/auth')
const Admin = require('../models/Admin');
const User = require('../models/User');

router.get('/test', authenticateToken, (req, res)=>{
    res.status(200).json("yayyaya");
})

// get all requests
router.get('/admins', async(req, res)=>{
    try{
        const admins = await Admin.find();

        let adminlist = []
        for(i in admins) {
            adminlist.push([admins[i].email,admins[i].username])
        }

        return res.status(200).json(adminlist)

    }catch(err){
        return res.status(500).json({message: err})
    }
})

module.exports = router;