

const uploadImages = (req, res) => {
    console.log(req)
    console.log("files: ", req.body);
    res.json({
        msg: "working"
    })
}

module.exports = {
    uploadImages
}
