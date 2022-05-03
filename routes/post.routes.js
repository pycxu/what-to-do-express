const express = require('express');
const router = express.Router();
const post = require('../models/post.model');
const m = require('../helpers/middlewares');
const helper = require('../helpers/helper');

// Get all todo items
router.get('/', async (req, res) => {
  await post
    .getPosts()
    .then((posts) => res.json(posts))
    .catch(err => helper.errorResponse(err, res, 500));
});

// Get todo item by id
router.get('/:id', m.mustBeInteger, async (req, res) => {
  await post
    .getPost(req.params.id)
    .then((p) => res.json(p))
    .catch(err => helper.errorResponse(err, res, 500));
});

// Insert a new todo item
router.post('/', m.checkFieldsPost, async (req, res) => {
  await post
    .insertPost(req.body)
    .then((p) => res.json(p))
    .catch(err => helper.errorResponse(err, res, 500));
});

// Update selected todo item
router.put('/:id', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
  await post
  .updatePost(req.params.id, req.body)
  .then((p) => res.json(p))
  .catch(err => helper.errorResponse(err, res, 500));
});

// Delete selected todo item
router.delete('/:id', m.mustBeInteger, async (req, res) => {
  await post
    .deletePost(req.params.id)
    .then(() => res.json({message: "deleted"}))
    .catch(err => helper.errorResponse(err, res, 500));
});

// Routes
module.exports = router;
