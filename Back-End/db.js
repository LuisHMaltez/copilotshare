// db.js
require('dotenv').config();

const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI; // Almacena esta URI en tu archivo .env
const client = new MongoClient(uri);

let database;

const connectDB = async () => {
    try {
        await client.connect();
        database = client.db(process.env.DB_NAME || 'test'); // Usa el nombre de tu base de datos en el .env
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1); // Detiene el servidor si no se puede conectar
    }
};

const getDB = () => {
    if (!database) {
        throw new Error('La base de datos no está conectada');
    }
    return database;
};

module.exports = { connectDB, getDB };
