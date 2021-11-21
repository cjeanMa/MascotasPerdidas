const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateJWT = (payload => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.KEY_JWT, {
            expiresIn: "1h"
        },  (err, token)=>{
            if(err){
                reject("Error generando Token")
            }
            else{
                resolve(token)
            }
        })
    });
})

const verifyJWT = async (token) =>{
    try{
        if(token.lengh <= 10){
            return null;
        }
        const payload = jwt.verify(token, process.env.KEY_JWT);

        const user = await User.findById(payload.uid);
        if(user){
            if(user.active){
                return user;
            }
        }
        else{
            return null;
        }

    }
    catch(err){
        console.log(err);
        return null;
    }
}

module.exports={
    generateJWT,
    verifyJWT
}