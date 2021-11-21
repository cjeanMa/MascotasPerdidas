const User = require("../models/userModel");

const checkUserId = async (id = null) =>{
    let user = await User.findById(id);
    if(!user){
        throw new Error("ID not found in Database");
    }
}

const checkEmailUnique = async (email=null)=>{
    let user = await User.findOne({email});

    if(user){
        throw new Error("Email ya esta registrado");
    }

}

module.exports = {
    checkUserId,
    checkEmailUnique
}