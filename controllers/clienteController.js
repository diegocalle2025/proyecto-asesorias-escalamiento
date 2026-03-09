const Cliente = require('../models/Cliente');

const createCliente = async (req, res) => {
    try {
        const { email } = req.body;
        const exists = await Cliente.findOne({ email });
        if (exists) {
            return res.status(400).json({ msg: 'El email ya está en uso' });
        }

        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear el cliente');
    }
}

const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener clientes');
    }
}

const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }
        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener el cliente');
    }
}

const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const clienteActualizado = await Cliente.findByIdAndUpdate(
            id, 
            { ...req.body, fechaActualizacion: Date.now() }, 
            { new: true }
        );
        res.json(clienteActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el cliente');
    }
}

const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }

        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        await Cliente.findByIdAndDelete(id);
        res.json({ msg: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el cliente');
    }
}

module.exports = {
    createCliente,
    getClientes,
    getClienteById,
    updateCliente,
    deleteCliente
};
