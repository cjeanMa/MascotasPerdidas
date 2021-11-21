
const allowRoles = (roles = []) => {
    return (req, res, next) =>{
        if(!roles.includes(req.userAuth.rol)){
            return res.status(403).json({
                msg:`El rol ${req.userAuth.rol} no tiene permisos para esta operacion`
            })
        }
        next();
    }

}

module.exports = {
    allowRoles
}