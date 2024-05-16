const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const adminAuth = require('../middleware/adminAuth');

// CRUD operations
router.post('/', adminAuth , postController.createPost);
router.get('/:id?', adminAuth , postController.getPostById);
router.put('/:id', adminAuth ,postController.updatePost);
router.delete('/:id', adminAuth ,postController.deletePost);

module.exports = router;
