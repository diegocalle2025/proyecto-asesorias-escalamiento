const TipoProyecto = require('../models/TipoProyecto');

const createTipoProyecto = async (req, res) => {
    try {
        const tipoProyecto = new TipoProyecto(req.body);
        await tipoProyecto.save();
        res.status(201).json(tipoProyecto);
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Datos inválidos', error: error.message });
        }
        res.status(500).send('Hubo un error al crear el tipo de proyecto');
    }
}

const getTiposProyecto = async (req, res) => {
    try {
        const tipos = await TipoProyecto.find();
        res.json(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener los tipos de proyecto');
    }
}

const getTipoProyectoById = async (req, res) => {
    try {
        const tipo = await TipoProyecto.findById(req.params.id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo de proyecto no encontrado' });
        }
        res.json(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener el tipo de proyecto');
    }
}

const updateTipoProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoActualizado = await TipoProyecto.findByIdAndUpdate(
            id, 
            { ...req.body, fechaActualizacion: Date.now() }, 
            { new: true }
        );
        res.json(tipoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el tipo de proyecto');
    }
}

const deleteTipoProyecto = async (req, res) => {
    try {
        const tipo = await TipoProyecto.findById(req.params.id);
        if (!tipo) {
            return res.status(404).json({ msg: 'Tipo de proyecto no encontrado' });
        }
        await TipoProyecto.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Tipo de proyecto eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el tipo de proyecto');
    }
}

module.exports = {
    createTipoProyecto,
    getTiposProyecto,
    getTipoProyectoById,
    updateTipoProyecto,
    deleteTipoProyecto
};
