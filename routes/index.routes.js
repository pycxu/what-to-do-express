const express = require('express');
const router = express.Router();

router.use('/api/v1/posts', require('./post.routes'));
router.use('/api/v1/todos', require('./todo.routes'));

module.exports = router;
