const { Router } = require('express');
const { createEtapa, getEtapas, getEtapaById, updateEtapa, deleteEtapa } = require('../controllers/etapaController');

const router = Router();

router.post('/', createEtapa);
router.get('/', getEtapas);
router.get('/:id', getEtapaById);
router.put('/:id', updateEtapa);
router.delete('/:id', deleteEtapa);

module.exports = router;
