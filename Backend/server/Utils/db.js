const mongoose = require('mongoose');

// URL de conexión a MongoDB
const dbURI = 'mongodb+srv://csanchez:MVujxEhJIxinwSV6@bbdd.qmgig.mongodb.net/'; // Reemplaza con la URL de tu base de datos

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado');
    } catch (err) {
        console.error('Error al conectar con MongoDB:', err);
        process.exit(1); // Salir del proceso si no se puede conectar
    }
};

module.exports = connectDB;
