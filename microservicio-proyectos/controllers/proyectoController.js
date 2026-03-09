const Proyecto = require('../models/Proyecto');

const createProyecto = async (req, res) => {
    try {
        const { numero } = req.body;
        const exists = await Proyecto.findOne({ numero });
        if (exists) {
            return res.status(400).json({ msg: 'El número de proyecto ya existe' });
        }

        const proyecto = new Proyecto(req.body);
        await proyecto.save();
        res.status(201).json(proyecto);
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Datos inválidos', error: error.message });
        }
        res.status(500).send('Hubo un error al crear el proyecto');
    }
}

const getProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find()
            .populate('cliente', 'nombre email')
            .populate('tipoProyecto', 'nombre')
            .populate('universidad', 'nombre')
            .populate('etapa', 'nombre');
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener proyectos');
    }
}

const getProyectoById = async (req, res) => {
    try {
        const { id } = req.params;
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }
        const proyecto = await Proyecto.findById(id)
            .populate('cliente', 'nombre email')
            .populate('tipoProyecto', 'nombre')
            .populate('universidad', 'nombre')
            .populate('etapa', 'nombre');
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener el proyecto');
    }
}

const updateProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const proyectoActualizado = await Proyecto.findByIdAndUpdate(
            id, 
            { ...req.body, fechaActualizacion: Date.now() }, 
            { new: true }
        );
        res.json(proyectoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el proyecto');
    }
}

const deleteProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }
        const proyecto = await Proyecto.findById(id);
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        await Proyecto.findByIdAndDelete(id);
        res.json({ msg: 'Proyecto eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el proyecto');
    }
}

module.exports = {
    createProyecto,
    getProyectos,
    getProyectoById,
    updateProyecto,
    deleteProyecto
};
