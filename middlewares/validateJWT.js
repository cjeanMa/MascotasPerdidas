const { request } = require("express");
const { verifyJWT } = require("../helpers/helper-jwt");

const validateJWT = async (req = request, res, next) => {
    let token = req.header("token");
    if (!token) {
        return res.status(403).json({
            msg: "peticion sin token"
        })
    }
    let user = await verifyJWT(token);
    if (!user) {
        return res.status(403).json({
            msg: "usuario no autenticado"
        })
    };
    if (!user.active) {
        return res.status(403).json({
            msg: "usuario deshabilitado"
        })
    };

    req.userAuth = user;
    next();
}

module.exports = {
    validateJWT
}