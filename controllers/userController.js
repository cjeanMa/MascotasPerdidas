const bcrypt = require("bcryptjs")
const User = require("../models/userModel")

const getAllUsers = async (req, res) => {
    const query = { active: true};
    const users = await User.find(query);

    res.json(
        users
    )
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const query = { _id: id, active:true}
    const user = await User.findOne(query);
    if(!user){
        return res.status(400).json({
            msg: "usuario no encontrado o deshabilitado"
        })
    }
    res.json({
        user
    })
}
const createUser = async (req, res) => {
    const { name, email, rol="USER_ROL" } = req.body;
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    const user = new User({ name, email, password, rol })

    await user.save();

    res.json({
        user
    })
}

const registerUser = async(req, res)=>{
    
    const { name, email} = req.body;
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    const user = new User({ name, email, password })
    
    await user.save();

    res.json({
        userAuth: req.userAuth,
        user
    })
}

const updateUser = async (req, res) => {

    const {id} = req.params;
    const { name } = req.body;

    let user = await User.findByIdAndUpdate(id);

    user.name = name ? name : user.name;

    await user.save();

    res.json(user)
}
const deleteUser = async (req, res) => {

    const { id } = req.params;
    let query = {active: false};

    let user = await User.findByIdAndUpdate(id, query,{new:true});

    res.json(user)
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    registerUser
}