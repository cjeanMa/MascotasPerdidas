const { Router } = require("express");
const { getAllTypes,
    getType,
    createType,
    updateType,
    deleteType } = require("../controllers/typeController");
const { check } = require("express-validator");
const { checkValidations } = require("../middlewares/checkValidation");
const { validateJWT } = require("../middlewares/validateJWT");
const { allowRoles } = require("../middlewares/checkRol");

const router = Router();

router.get("/", getAllTypes);
router.get("/:id",[
   check("id", "El id no existe").isMongoId(),
   checkValidations
], getType);
router.post("/",[
    validateJWT,
    allowRoles(["ADMIN_ROL"]),
    check("name", "El campo name es necesario"),
    checkValidations
], createType);
router.put("/:id",[
    check("id", "El id no existe").isMongoId(),
    checkValidations
], updateType);
router.delete("/:id",[
    check("id", "El id no existe").isMongoId(),
    checkValidations
], deleteType);

module.exports = router;