const express = require('express');
const todoController = require('../Backend/controllers/todoController');
const { verifyToken } = require('../Backend/middlewares/authMiddleware');

const router = express.Router();

router.post('/todos', verifyToken, todoController.createTodo);
router.get('/todos?user=user1', verifyToken, todoController.getTodos);
router.put('/todos/:id', verifyToken, todoController.updateTodo);
router.delete('/todos/:id', verifyToken, todoController.deleteTodo);

module.exports = router;