const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category, sku } = req.body;

    if (!name || !price || !category || !sku) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = new Product({
      name,
      description,
      price,
      quantity,
      category,
      sku
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.status(200).json({ count: products.length, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category, sku, isActive } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price) updateData.price = price;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (category) updateData.category = category;
    if (sku) updateData.sku = sku;
    if (isActive !== undefined) updateData.isActive = isActive;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json({ count: products.length, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
