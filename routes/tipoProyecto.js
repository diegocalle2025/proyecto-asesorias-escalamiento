const { Router } = require('express');
const { createTipoProyecto, getTiposProyecto, getTipoProyectoById, updateTipoProyecto, deleteTipoProyecto } = require('../controllers/tipoProyectoController');

const router = Router();

router.post('/', createTipoProyecto);
router.get('/', getTiposProyecto);
router.get('/:id', getTipoProyectoById);
router.put('/:id', updateTipoProyecto);
router.delete('/:id', deleteTipoProyecto);

module.exports = router;
