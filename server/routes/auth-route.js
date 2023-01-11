const User = require('../models/User')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router();

router.post('/createUser', async (req, res) => {
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            const hashPassword = await bcrypt.hash(password, 10);
            let user = await User.create({ name: name, email: email, password: hashPassword });
            res.status(200).json({ success: true, data: user.id, statusCode: 200 });
        } else {
            res.status(404).json({ success: false, msg: 'Please enter another email address',statusCode: 404 });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
})

router.post('/login', async (req, res)=>{
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).json({ success: false, msg: "Please enter the correct credentials", statusCode: 401 });
        }
        else {
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                res.status(401).json({ success: false, msg: "Please enter the correct credentials",statusCode: 401 })
            } else {
                res.status(200).json({ success: true, data: user.id,statusCode: 200 })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({succes:false,msg:"Internal serever error"});
    }
})

module.exports = router;
