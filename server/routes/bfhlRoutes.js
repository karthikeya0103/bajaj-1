const express = require('express');
const router = express.Router();
const { getOperationCode, postData } = require('../controllers/bfhlController');

router.get('/', getOperationCode);
router.post('/', postData);

module.exports = router;
