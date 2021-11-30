const { Router } = require("express");
const {
    getAllPets,
    getPet,
    createPet,
    updatePet,
    deletePet
} = require("../controllers/petController");
const { check } = require("express-validator");
const { checkValidations } = require("../middlewares/checkValidation"); 
const { validateJWT } = require("../middlewares/validateJWT");
const { allowRoles } = require("../middlewares/checkRol");

const router = Router();


router.get("/", getAllPets);
router.get("/:id",[
    check("id", "No es un id mongo").isMongoId(),
    checkValidations
], getPet);
router.post("/",[
    validateJWT,
    allowRoles(["USER_ROL", "ADMIN_ROL"]),
    check("name", "campo name es necesario").not().isEmpty(),
    check("description", "campo email es necesario").not().isEmail(),
    check("contact", "campo contact es necesario").not().isEmpty(),
    check("type", "el campo de type es necesario").isMongoId(),
    checkValidations
], createPet);
router.put("/:id",[
    check("id", "No es un id mongo").isMongoId(),
    check("name", "campo name es necesario").not().isEmpty(),
    checkValidations
], updatePet);
router.delete("/:id",[
    check("id", "ID no corresponde a mongo").isMongoId(),
    checkValidations
], deletePet);

module.exports = router;
