const express = require("express");
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
const cors = require('cors')
const { mongoConnection } = require("../database/db");
const {uploadImages} = require("../controllers/uploadImages")

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.dbCon();
        this.middlewares();
        this.routes();
    }

    middlewares(){  
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true}));
        this.app.use(morgan('tiny'));
        this.app.use(fileUpload());
    }

    routes(){
        this.app.use("/api/users", require("../routes/userRoutes"));
        this.app.use("/api/auth", require("../routes/authRoutes"));
        this.app.use("/api/pets", require("../routes/petRoutes"));
        this.app.use("/api/types", require("../routes/typeRoutes"));
        
        this.app.post("/api/dactilar", uploadImages);

        
    }

    async dbCon(){
         await mongoConnection();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`runnign in port ${this.port}`)
        })
    }

}

module.exports = Server;

