const { deleteCategory, deleteProduct, createCategory, createSubCategory, addProduct, getCategoryList, getSubCategoryList, getProductList, getCategoryData, updateCategory, updateProduct } = require('../controllers/categoryController.js');

const { Router } = require('express');
const adminAuth = require('../middleware/adminAuth.js');

const router = Router();

router.post('/create', adminAuth, createCategory);
router.post('/product/create', adminAuth, addProduct);
router.get('/', adminAuth, getCategoryList);
router.get('/product/:categoryId/', adminAuth, getCategoryData);
router.post('/update', adminAuth, updateCategory);
router.post('/product/update', adminAuth, updateProduct);
router.delete('/:categoryId', adminAuth, deleteCategory);
router.delete('/:categoryId/product/:productId', adminAuth, deleteProduct);

module.exports = router;

