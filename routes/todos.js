const express = require('express');
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/todos');

router.get('/', helpers.getTodos);
router.post('/', helpers.createTodo);

router.get('/:todoId', helpers.getTodo);
router.put('/:todoId', helpers.updateTodo);
router.delete('/:todoId', helpers.deleteTodo);

module.exports = router;
