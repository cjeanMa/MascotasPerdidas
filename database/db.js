const mongoose = require('mongoose');

const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        console.log("Conexion a bd exitosa");
    }
    catch (err) {
        throw new Error("Error al conectar con la base de datos")
    }
}

module.exports = {
    mongoConnection
}