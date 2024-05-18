const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const adminAuth = require('../middleware/adminAuth');

// CRUD operations
router.post('/', postController.createPost);
router.get('/:id?' , postController.getPostById);
router.put('/:id',postController.updatePost);
router.delete('/:id' , postController.deletePost);



module.exports = router;
