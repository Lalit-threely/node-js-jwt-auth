const Category = require('../models/category.js');

const createCategory = async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        const data = await Category.find({ name: name });
        if (data.length > 0) {
            return res.status(400).json({ message: "category already exists. ", success: false });
        }
        const newCategory = new Category({
            name,
            imageUrl,
            products: []
            // subCategory: []
        });
        const savedCategory = await newCategory.save();
        res.status(201).json({ ...savedCategory, success: true });
    } catch (err) {
        res.status(500).json({ error: err.message, success: false });
    }
}

async function getProductListByCategoryName(req, res) {
    try {
        const { categoryName } = req.params;
        console.log(categoryName);
        const result = await Category.findOne({ name: categoryName });
        console.log(result);
        if (!result) {
            return res.status(404).json({ message: "Category not found.", success: false });
        }
        res.status(200).json(result.products);
    } catch (err) {
        res.status(500).json({ error: err.message, success: false });
    }
}

const createSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const categoryData = await Category.findById(categoryId);
        if (!categoryData) {
            return res.status(400).json({ message: "Category not found." });
        }
        const data = categoryData.subCategory.find(sub => sub.name === name);
        if (data) {
            return res.status(400).json({ message: "Subcategory already exists." });
        }
        const newSubCategory = {
            name,
            products: []
        };
        categoryData.subCategory.push(newSubCategory);
        const savedCategory = await categoryData.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, imageUrl, url, categoryId } = req.body;

        // Find the category by ID
        const category = await Category.findById(categoryId);

        // If category not found, return error
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found.' });
        }

        // Create a new product object
        const newProduct = {
            name,
            imageUrl,
            url
        };

        // Push the new product into the subcategory's products array
        category.products.push(newProduct);

        // Save the updated category
        await category.save();

        res.status(201).json({ success: true, message: 'Product added successfully.', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add product.', error });
    }
};

const getCategoryList = async (req, res) => {
    try {
        const categories = await Category.find().select('_id name imageUrl').sort({ _id: -1 });
        const formattedCategories = categories.map(category => ({
            id: category._id,
            name: category.name,
            imageUrl: category.imageUrl
        }));
        res.status(200).json(formattedCategories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSubCategoryList = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId }).select('subCategory');
        const formattedSubCategory = category.subCategory.map(data => {
            const temp = {
                id: data._id,
                name: data.name,
            };
            return temp;
        });
        res.status(200).json(formattedSubCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getCategoryData = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { name, _id, imageUrl, products } = req.body;
        const category = await Category.findById(_id);
        if (!category) {
            return res.status(404).json({ message: "Category not found.", success: false });
        }
        if (name)
            category.name = name;
        if (imageUrl)
            category.imageUrl = imageUrl;
        if (products)
            category.products = products;

        const savedCategory = await category.save();
        res.status(200).json({ ...savedCategory, success: true });
    } catch (err) {
        res.status(500).json({ error: err.message, success: false });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, url, categoryId, productId } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found.", success: false });
        }
        const product = category.products.find(product => product._id.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found.", success: false });
        }
        product.name = name;
        product.url = url;
        const savedCategory = await category.save();
        res.status(200).json({ ...savedCategory, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const result = await Category.deleteOne({ _id: categoryId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Category not found.", success: false });
        }
        res.status(200).json({ message: "Category deleted successfully.", success: true });
    } catch (err) {
        res.status(500).json({ error: err.message, success: false });
    }
}

async function getCategoryByProductName(req, res) {
    try {
        const { productName } = req.body;
        const category = await Category.findOne({ products: { $elemMatch: { name: productName } } });
        if (!category) {
            return res.status(404).json({ message: "Category not found.", success: false });
        }
        res.status(200).json({categoryName: category.name, categoryId: category.id});
    } catch (err) {
        return res.status(500).json({ message: "Error while finding querry", success: false, error: err })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { categoryId, productId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found.", success: false });
        }
        const productIndex = category.products.findIndex(product => product._id.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found.", success: false });
        }
        category.products.splice(productIndex, 1);
        await category.save();
        res.status(200).json({ message: "Product deleted successfully.", success: true });
    } catch (err) {
        res.status(500).json({ error: err.message, success: false });
    }
}


module.exports = { getCategoryByProductName, getProductListByCategoryName, deleteCategory, deleteProduct, updateProduct, createCategory, createSubCategory, addProduct, getCategoryList, getSubCategoryList, getCategoryData, updateCategory };
