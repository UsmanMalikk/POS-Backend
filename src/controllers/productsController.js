// controllers/productsController.js
const Product = require('../models/addProduct');
async function generateSku() {
    const product = await Product.findOne().sort({ sku: -1 });
    // console.log(product)
    if (product) {
        // If a product with SKU exists, increment it by one
        const latestSku = product.sku;
        const newSku = latestSku + 1;
        // let prefix = invoice.namePrefix;                         ///FromPreffix schema later


        // Generate the formatted invoice number
        // if (prefix === '') {
        return newSku;

    }
    else {
        const newSku = 1;
        return newSku;

    }
    // } else {
    //     // const currentYear = new Date().getFullYear();
    //     return `${prefix}-${currentInvoiceNumber.toString().padStart(numberOfDigits, '0')}`;
    // }

    // return null; // Invalid format
}
// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('grpPrices.spg', 'name').populate('unit', 'name').populate('businessLocation','name');
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const productData = req.body;
// console.log(req.file)
    
    try {
        if (req.body.sku==='0') {
            const generatedSkuNumber = await generateSku();
            productData.sku = generatedSkuNumber

        }
        if (req.file) {
            // Add the file path to the product data
            productData.productImage = req.file.path;
    
        }
        const newProduct = await Product.create(productData);

     
        res.status(201).json({ message: 'Product added successfully', product: newProduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    try {
        await Product.findByIdAndUpdate(productId, productData);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for GET /product/:id
exports.getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId).populate('brand', 'brandName').populate('category', 'categoryName').populate('unit', 'name shortName').populate('businessLocation','name').populate('grpPrices.spg', 'name');

        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};