const Universidad = require('../models/Universidad');

const createUniversidad = async (req, res) => {
    try {
        const universidad = new Universidad(req.body);
        await universidad.save();
        res.status(201).json(universidad);
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Datos inválidos', error: error.message });
        }
        res.status(500).send('Hubo un error al crear la universidad');
    }
}

const getUniversidades = async (req, res) => {
    try {
        const universidades = await Universidad.find();
        res.json(universidades);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener universidades');
    }
}

const getUniversidadById = async (req, res) => {
    try {
        const universidad = await Universidad.findById(req.params.id);
        if (!universidad) {
            return res.status(404).json({ msg: 'Universidad no encontrada' });
        }
        res.json(universidad);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener la universidad');
    }
}

const updateUniversidad = async (req, res) => {
    try {
        const { id } = req.params;
        const universidadActualizada = await Universidad.findByIdAndUpdate(
            id, 
            { ...req.body, fechaActualizacion: Date.now() }, 
            { new: true }
        );
        res.json(universidadActualizada);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar la universidad');
    }
}

const deleteUniversidad = async (req, res) => {
    try {
        const universidad = await Universidad.findById(req.params.id);
        if (!universidad) {
            return res.status(404).json({ msg: 'Universidad no encontrada' });
        }
        await Universidad.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Universidad eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la universidad');
    }
}

module.exports = {
    createUniversidad,
    getUniversidades,
    getUniversidadById,
    updateUniversidad,
    deleteUniversidad
};
