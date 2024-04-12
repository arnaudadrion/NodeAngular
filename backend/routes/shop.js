const express = require('express');
const router = express.Router();

const shopCtrl = require('../controllers/shop');

router.post('/', shopCtrl);
router.post('/', shopCtrl);

module.exports = router;