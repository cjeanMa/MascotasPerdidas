const { Schema, model } = require("mongoose");

const TypeSchema = Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    active:{
        type: Boolean,
        default: true
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

TypeSchema.methods.toJSON = function(){
    const {password,
         __v,
          _id,
          createdAt,
          updatedAt,
          active,
         ...user} = this.toObject();
    user.uid = _id;
    return user;
}


module.exports= model("type", TypeSchema);