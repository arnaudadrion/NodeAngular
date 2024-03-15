const express = require('express');
const router = express.Router();

const todolistCtrl = require('../controllers/todolist');

router.post('/todo', todolistCtrl.list);
router.post('/todo/add', userCtrl.add);
router.post('/todo/delete', todolistCtrl.delete);


module.exports = router;