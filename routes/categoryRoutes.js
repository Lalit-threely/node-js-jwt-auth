const { createCategory, createSubCategory, addProduct, getCategoryList, getSubCategoryList, getProductList, getCategoryData, updateCategory, updateProduct, deleteCategory, deleteProduct } = require('../controllers/categoryController.js');

const { Router } = require('express');
const adminAuth = require('../middleware/adminAuth.js');

const router = Router();

router.post('/create', adminAuth, createCategory);
// router.post('/subcategory/create', createSubCategory);
router.post('/product/create', adminAuth, addProduct);
router.get('/', adminAuth, getCategoryList);
// router.get('/subcategory/:categoryId', getSubCategoryList);
router.get('/product/:categoryId/', adminAuth, getCategoryData);
router.post('/update', adminAuth, updateCategory);
router.post('/product/update', adminAuth, updateProduct);
router.delete('/:categoryId', deleteCategory);
router.delete('/:categoryId/products/:productId', deleteProduct);

module.exports = router;
