const bcrypt = require("bcryptjs")
const Pet = require("../models/petModel")

const getAllPets = async (req, res) => {
    const query = { active: true };
    const pets = await Pet.find(query);
    res.json(
        pets
    )
}

const getPet = async (req, res) => {
    const { id } = req.params;
    const query = { _id: id, active:true}
    const pet = await Pet.findOne(query);
    if(!pet){
        return res.status(400).json({
            msg: "mascota no encontrada o deshabilitada"
        })
    }
    res.json({
        pet
    })
}
const createPet = async (req, res) => {
    const { name, description, contact, type } = req.body;
    const idUser = req.userAuth._id;

    const pet = new Pet({ name,
                         description,
                         contact,
                         type, 
                         user: idUser})

    await pet.save();

    res.status(201).json({
        pet
    })
}
const updatePet = async (req, res) => {

    const {id} = req.params;
    const { name } = req.body;

    let pet = await Pet.findByIdAndUpdate(id);

    await pet.save();

    res.json(pet)
}
const deletePet = async (req, res) => {

    const { id } = req.params;
    let query = {active: false};

    let pet = await Pet.findByIdAndUpdate(id, query,{new:true});

    res.json(pet)
}

module.exports = {
    getAllPets,
    getPet,
    createPet,
    updatePet,
    deletePet
}