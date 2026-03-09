const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGODB_URI;
        await mongoose.connect(url);
        console.log('¡Conexión a MongoDB Atlas exitosa!');
    } catch (error) {
        console.log('Error de conexión a la BD:', error);
    }
}

module.exports = {
    getConnection,
};
