const { getProductListByCategoryName, deleteCategory, deleteProduct, createCategory, createSubCategory, addProduct, getCategoryList, getSubCategoryList, getProductList, getCategoryData, updateCategory, updateProduct } = require('../controllers/categoryController.js');

const { Router } = require('express');
const adminAuth = require('../middleware/adminAuth.js');

const router = Router();

router.post('/create', adminAuth, createCategory);
router.post('/product/create', adminAuth, addProduct);
router.get('/', getCategoryList);
router.get('/product/:categoryId/', getCategoryData);
router.post('/update', adminAuth, updateCategory);
router.post('/product/update', adminAuth, updateProduct);
router.get('/product/name/:categoryName', getProductListByCategoryName);
router.delete('/:categoryId', adminAuth, deleteCategory);
router.delete('/:categoryId/product/:productId', adminAuth, deleteProduct);

module.exports = router;

