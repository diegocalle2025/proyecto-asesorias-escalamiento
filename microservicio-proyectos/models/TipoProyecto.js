const { Schema, model } = require('mongoose');

const TipoProyectoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        enum: ['ensayo', 'articulo', 'monografia', 'trabajo final de pregrado', 'trabajo final de especializacion']
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = model('TipoProyecto', TipoProyectoSchema);
