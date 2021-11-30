const {model, Schema} = require("mongoose");

const PetSchema = Schema({
    name: {
        type: String,
        required: [true, "Campo name es necesario"]
    },
    description:{
        type: String,
        required: [true, "Campo description es neceasrio"]
    },
    active:{
        type: Boolean, 
        default: true
    },
    found:{
        type: Boolean,
        default: false,
    },
    contact:{
        type: String,
        required: [true, "campo contact es necesario"]
    },
    imagen:{
        type: String,
        default: "none"
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"user",
        required:[true, "El id de usuario es necesario"]
    },
    type:{
        type: Schema.Types.ObjectId,
        ref:"type",
        required:[true, "El id de tipo es necesario"]
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


module.exports = model("pet", PetSchema);