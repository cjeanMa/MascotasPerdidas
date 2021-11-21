const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "pasword is required"]
    },
    facebook:{
        type: String,
        default: false
    },
    google:{
        type: String,
        default: false
    },
    active:{
        type: Boolean,
        default: true
    },
    rol:{
        type: String,
        default: 'USER_ROL'
    },
    img:{
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    }
})

UserSchema.methods.toJSON = function(){
    const {password,
         __v,
          _id,
          createdAt,
          updatedAt,
          google,
          facebook,
          active,
         ...user} = this.toObject();
    user.uid = _id;
    return user;
}


module.exports= model("user", UserSchema);