const express = require("express");
const { 
  addProduct, 
  addProductCategory, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct, 
  getProductCategories, 
  getProductCategoryById, 
  updateProductCategory, 
  deleteProductCategory 
} = require("../controllers/productCtrl.js");
const { upload } = require("../middlewares/multer.middleware.js");

const router = express.Router();

// Below not working so using here
router.get('/categories', getProductCategories); 

// Product routes
router.get('/', getProducts); // Fetch all products
router.get('/:id', getProductById); // Fetch a single product by ID
router.post('/add', upload.single('image'), addProduct);
router.patch('/:id', upload.single('image'), updateProduct); // Update a product by ID
router.delete('/:id', deleteProduct); // Delete a product by ID

// Product Category routes
// router.get('/categories', getProductCategories); // Fetch all categories
router.get('/categories/:id', getProductCategoryById); // Fetch a single category by ID
router.post('/add-category', addProductCategory);
router.patch('/categories/:id', updateProductCategory); // Update a category by ID
router.delete('/categories/:id', deleteProductCategory); // Delete a category by ID

module.exports = router;
