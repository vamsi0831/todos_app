const express = require('express');
const router = express.Router();
const Todo = require('../Models/todo.model');

router.get('/', async (req, res, next) => {
    console.log(req.query.user);
    try {
        const allTodos = await Todo.find({owner: req.query.user}, {__v: 0});
        res.send(allTodos);
        
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/', (req, res, next) => {
    // console.log(req.body);
    const todo = new Todo({
        todo: req.body.todo,
        owner: req.body.owner
    })
    todo.save()
        .then(result => {
            // console.log(result);
            res.send(result)
        })
        .catch(err => {
            console.log(err.message);
        })
});

router.patch('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        const updates = req.body;

        const result = await Todo.findByIdAndUpdate(id, updates);
        res.send(result);

    } catch (error) {
        console.log(error.message);
    }
});

router.delete('/:id', (req, res, next) => {
    res.send('delete todo...');
});

module.exports = router;