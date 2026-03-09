const Etapa = require('../models/Etapa');

const createEtapa = async (req, res) => {
    try {
        const etapa = new Etapa(req.body);
        await etapa.save();
        res.status(201).json(etapa);
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Datos inválidos', error: error.message });
        }
        res.status(500).send('Hubo un error al crear la etapa');
    }
}

const getEtapas = async (req, res) => {
    try {
        const etapas = await Etapa.find();
        res.json(etapas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener etapas');
    }
}

const getEtapaById = async (req, res) => {
    try {
        const { id } = req.params;
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }
        const etapa = await Etapa.findById(id);
        if (!etapa) {
            return res.status(404).json({ msg: 'Etapa no encontrada' });
        }
        res.json(etapa);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener la etapa');
    }
}

const updateEtapa = async (req, res) => {
    try {
        const { id } = req.params;
        const etapaActualizada = await Etapa.findByIdAndUpdate(
            id, 
            { ...req.body, fechaActualizacion: Date.now() }, 
            { new: true }
        );
        res.json(etapaActualizada);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar la etapa');
    }
}

const deleteEtapa = async (req, res) => {
    try {
        const { id } = req.params;
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }
        const etapa = await Etapa.findById(id);
        if (!etapa) {
            return res.status(404).json({ msg: 'Etapa no encontrada' });
        }
        await Etapa.findByIdAndDelete(id);
        res.json({ msg: 'Etapa eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la etapa');
    }
}

module.exports = {
    createEtapa,
    getEtapas,
    getEtapaById,
    updateEtapa,
    deleteEtapa
};
