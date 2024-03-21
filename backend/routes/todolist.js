const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const todolistCtrl = require('../controllers/todolist');

router.get('/list', auth, todolistCtrl.list);
router.post('/add', auth, todolistCtrl.addTask);
router.post('/delete', auth, todolistCtrl.deleteTask);


module.exports = router;