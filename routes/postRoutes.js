const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const adminAuth = require('../middleware/adminAuth');

// CRUD operations
router.post('/', postController.createPost);
router.get('/' , postController.getPostById);
router.put('/:id',postController.updatePost);
router.delete('/:id' , postController.deletePost);
router.get('/:id?/:title?', postController.getPostByIdOrTitle);


module.exports = router;
