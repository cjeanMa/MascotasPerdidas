const { Router } = require("express")

const { check } = require("express-validator")

const { uploadImage } = require("../controllers/uploadImageController")

const router = Router();

router.post("/upload/:id",[
    check('id', "No es un id valido").isMongoId()
],
uploadImage)

module.exports = router;
