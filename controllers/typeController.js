const bcrypt = require("bcryptjs")
const Type = require("../models/typeModel")

const getAllTypes = async (req, res) => {
    const query = { active: true};
    const types = await Type.find(query);

    res.json(
        types
    )
}

const getType = async (req, res) => {
    const { id } = req.params;
    const query = { _id: id, active:true}
    const type = await Type.findOne(query);
    if(!type){
        return res.status(400).json({
            msg: "usuario no encontrado o deshabilitado"
        })
    }
    res.json({
        type
    })
}
const createType = async (req, res) => {
    const { name } = req.body;

    const typeDB = await Type.findOne({name});
    if(typeDB){
        return res.status(400).json({
            msg: "Tal categoria o Tipo ya existe"
        })
    }

    const type = new Type({ name })

    await type.save();

    res.json({
        user:req.userAuth,
        type
    })
}
const updateType = async (req, res) => {

    const {id} = req.params;
    const { name } = req.body;

    let type = await Type.findByIdAndUpdate(id, { name }, {new:true});

    await type.save();

    res.json(type)
}
const deleteType = async (req, res) => {

    const { id } = req.params;
    let query = {active: false};

    let type = await Type.findByIdAndUpdate(id, query,{new:true});

    res.json(type)
}

module.exports = {
    getAllTypes,
    getType,
    createType,
    updateType,
    deleteType
}