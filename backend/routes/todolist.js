const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const todolistCtrl = require('../controllers/todolist');

router.post('/list', auth, todolistCtrl.list);
router.post('/add', auth, userCtrl.add);
router.post('/delete', auth, todolistCtrl.delete);


module.exports = router;