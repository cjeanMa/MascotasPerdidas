const { Router } = require("express");
const {
    getAllPets,
    getPet,
    createPet,
    updatePet,
    deletePet
} = require("../controllers/petController");
const { check } = require("express-validator");
const { checkValidations } = require("../middlewares/checkValidation") 

const router = Router();


router.get("/", getAllPets);
router.get("/:id",[
    check("id", "No es un id mongo").isMongoId(),
    checkValidations
], getPet);
router.post("/",[
    check("name", "campo name es necesario").not().isEmpty(),
    check("email", "campo email es necesario").isEmail(),
    check("password", "campo password es necesario").not().isEmpty(),
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
