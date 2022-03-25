const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/helper-jwt");
const User = require("../models/userModel");


const login = async (req, res) =>{
    
    const { email, password } = req.body;
    const query = {email, active:true };
    const user = await User.findOne(query)
    if(!user){
        return res.status(403).json({
            msg: "User not founded"
        })
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if(!checkPassword){
        return res.status(400).json({
            msg: "Incorrect Password"
        })
    }
    let payload = {
        uid: user._id,
        name: user.name
    }
    const token = await generateJWT(payload);
    if(!token){
        res.status(500).json({
            msg: "Error creating JWT"
        })
    }

    res.json({
        token,
        user
    })
}


module.exports = {
    login
}