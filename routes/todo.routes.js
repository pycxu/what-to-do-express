const express = require('express');
const router = express.Router();
const todo = require('../models/todo.model');
const m = require('../helpers/middlewares');
const helper = require('../helpers/helper');

// Get all todo items
router.get('/', async (req, res) => {
    await todo
        .getTodos()
        .then((todos) => res.json(todos))
        .catch(err => helper.errorResponse(err, res, 500));
});
  
// Get todo item by id
router.get('/:id', m.mustBeInteger, async (req, res) => {
    await todo
        .getTodo(req.params.id)
        .then(t => res.json(t))
        .catch(err => helper.errorResponse(err, res, 500));
});

// Insert a new todo item
router.post('/', m.checkFieldsTodo, async (req, res) => {
    await todo
        .addTodo(req.body)
        .then(t => res.json(t))
        .catch(err => helper.errorResponse(err, res, 500));
});

// Update selected todo item
router.put('/:id', m.mustBeInteger, async (req, res) => {
    await todo
        .updateTodo(req.params.id)
        .then(t => res.json(t))
        .catch(err => helper.errorResponse(err, res, 500));
});

// Delete selected todo item
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    await todo
        .deleteTodo(req.params.id)
        .then(() => res.json({message: "deleted"}))
        .catch(err => helper.errorResponse(err, res, 500));
});

// Routes
module.exports = router;