const router = require('express').Router();
const authenticateToken = require('../middlewares/auth')

router.get('/test', authenticateToken, (req, res)=>{
    res.status(200).json("yayyaya");
})

module.exports = router;