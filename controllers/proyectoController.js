const Proyecto = require('../models/Proyecto');

const createProyecto = async (req, res) => {
    try {
        const proyecto = new Proyecto(req.body);
        await proyecto.save();
        res.status(201).json(proyecto);
    } catch (error) {
        console.log(error);
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

module.exports = {
    createProyecto,
    getProyectos,
    updateProyecto
};
