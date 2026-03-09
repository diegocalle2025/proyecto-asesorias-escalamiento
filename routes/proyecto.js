const { Router } = require('express');
const { createProyecto, getProyectos, updateProyecto } = require('../controllers/proyectoController');

const router = Router();

router.post('/', createProyecto);
router.get('/', getProyectos);
router.put('/:id', updateProyecto);

module.exports = router;
