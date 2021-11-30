const { Router } = require("express");
const { getAllUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        registerUser,
        sendEmailConfirmation} =  
        require("../controllers/userController")
const { check } = require("express-validator");
const { checkValidations } = require("../middlewares/checkValidation");
const { checkUserId, checkEmailUnique } = require("../helpers/db-validators");
const { validateJWT } = require("../middlewares/validateJWT");
const { allowRoles } = require("../middlewares/checkRol");

const router = Router();

router.get("/", getAllUsers);
router.get("/:id",[
    check("id", "No es un id mongo").isMongoId(),
    checkValidations
], getUser);
router.post("/registration",[
    check("name", "campo name es necesario").not().isEmpty(),
    check("email", "campo email es necesario").isEmail(),
    check("email").custom(checkEmailUnique),
    check("password", "campo password es necesario").not().isEmpty(),
    checkValidations
], registerUser);
router.post("/",[
    validateJWT,
    allowRoles(["ADMIN_ROL"]),
    check("name", "campo name es necesario").not().isEmpty(),
    check("email", "campo email es necesario").isEmail(),
    check("email").custom(checkEmailUnique),
    check("password", "campo password es necesario").not().isEmpty(),
    checkValidations
], createUser);
router.put("/:id",[
    validateJWT,
    allowRoles(["ADMIN_ROL"]),
    check("id", "No es un id mongo").isMongoId(),
    check("name", "campo name es necesario").not().isEmpty(),
    checkValidations
], updateUser);
router.delete("/:id",[
    check("id", "ID no corresponde a mongo").isMongoId(),
    check("id").custom(checkUserId),
    checkValidations
], deleteUser);

module.exports = router;

