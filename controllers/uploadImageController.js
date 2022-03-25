const path = require("path")
const fs = require("fs")

var cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)

const {upload} = require('../helpers/helper-upload')

const uploadImages = async(req, res) => {
    try{
        const archivo = await upload(req.files)
        res.json({
            archivo
        })
    }
    catch(err){
        res.status(500).json({
            msg : "Error uploading image"
        })
    }
}

module.exports = {
    uploadImages
}
