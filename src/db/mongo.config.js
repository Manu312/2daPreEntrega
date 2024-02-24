const mongoose = require('mongoose');

//COLOCAR CREDENCIALES MONGO ATLAS CONEXION
const DB_HOST = process.env.DB_HOST || ''; //completar
const DB_PORT = process.env.DB_PORT || ''; //completar
const DB_NAME = process.env.DB_NAME || '@cluster0.cd4rqm0.mongodb.net/';
const DB= process.env.DB || 'Ecommerce';

const configConnection ={
    //MongoAtlasConexion
    url: `mongodb+srv://${DB_HOST}:${DB_PORT}${DB_NAME}${DB}?retryWrites=true&w=majority`,
    //url: 'mongodb://localhost:27017/Ecommerce',
    options:{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

const mongoDBconnection = async () => {
    try{
        await mongoose.connect(configConnection.url, configConnection.options);
    }catch(err){
        console.log('Error connecting to the database', err);
        throw new Error(err);
    }

}
module.exports = {configConnection, mongoDBconnection}; 
