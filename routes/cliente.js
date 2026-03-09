const { Router } = require('express');
const { createCliente, getClientes, getClienteById, updateCliente, deleteCliente } = require('../controllers/clienteController');

const router = Router();

router.post('/', createCliente);
router.get('/', getClientes);
router.get('/:id', getClienteById);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

module.exports = router;
