const express = require('express');
const router = express.Router();
const { getAllFiscalias,insertFiscalias, deleteFiscalias, updateFiscalias, getAllLugares, getFiscaliaById } = require('../controller/fiscalia.js');

router.get('/fiscalias', getAllFiscalias);
router.post('/insertFiscalias', insertFiscalias);
router.delete('/fiscalia/:id', deleteFiscalias);
router.put('/fiscalia/:id', updateFiscalias);
router.get('/lugares', getAllLugares);
router.get('/fiscalia/:id', getFiscaliaById);

module.exports = router;