# Product Database Management System - Mongoose CRUD Operations

Implement CRUD operations for a product database using Mongoose.

## Overview

This Node.js application provides a complete CRUD (Create, Read, Update, Delete) API for managing products in a MongoDB database using Mongoose ODM. The application is built with Express.js and follows a clean MVC architecture.

## Project Structure

```
product-database-mongoose/
├── models/
│   └── Product.js              # Mongoose Product schema definition
├── controllers/
│   └── productController.js    # Product CRUD logic
├── routes/
│   └── productRoutes.js        # Express routes for products
├── app.js                      # Express server setup
├── README.md                   # Project documentation
└── package.json               # Dependencies (to be created)
```

## Features

- **Create Products**: Add new products with complete details
- **Read Products**: Retrieve all products or a specific product by ID
- **Update Products**: Modify existing product information
- **Delete Products**: Remove products from the database
- **Search Products**: Search for products by name, description, or category
- **Validation**: Input validation for product fields
- **Error Handling**: Comprehensive error handling middleware

## Product Schema

Each product contains the following fields:

- `name` (String, required): Product name
- `description` (String, optional): Product description
- `price` (Number, required, min: 0): Product price
- `quantity` (Number, default: 0, min: 0): Stock quantity
- `category` (String, required): Product category
- `sku` (String, required, unique): Stock Keeping Unit
- `isActive` (Boolean, default: true): Product availability status
- `createdAt` (Date, default: now): Creation timestamp
- `updatedAt` (Date, default: now): Last update timestamp

## API Endpoints

### Create a Product
```
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "quantity": 50,
  "category": "Electronics",
  "sku": "SKU001"
}
```

### Get All Products
```
GET /api/products
```

### Get Product by ID
```
GET /api/products/:id
```

### Update a Product
```
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 89.99,
  "quantity": 45
}
```

### Delete a Product
```
DELETE /api/products/:id
```

### Search Products
```
GET /api/products/search/query?query=electronics
```

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/akashsinhamahapatra78-cmd/product-database-mongoose.git
cd product-database-mongoose
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file** (optional)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-db
```

4. **Start the server**
```bash
node app.js
```

The server will run on `http://localhost:5000`

## Dependencies

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **dotenv**: Environment variable management (optional)

## File Descriptions

### models/Product.js
Defines the Mongoose schema and model for products with validation rules and auto-update timestamps.

### controllers/productController.js
Contains all business logic for CRUD operations including:
- `createProduct`: Creates a new product
- `getAllProducts`: Retrieves all active products
- `getProductById`: Fetches a single product
- `updateProduct`: Updates product details
- `deleteProduct`: Removes a product
- `searchProducts`: Searches across name, description, and category

### routes/productRoutes.js
Defines Express routes that map HTTP requests to controller functions.

### app.js
Sets up the Express server, MongoDB connection, middleware, and error handling.

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Successful GET or PUT request
- `201`: Successful POST request
- `400`: Bad request (missing or invalid fields)
- `404`: Product not found
- `500`: Server error

## Usage Example

```javascript
// Create a product
POST http://localhost:5000/api/products
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1299.99,
  "quantity": 25,
  "category": "Electronics",
  "sku": "LAP-001"
}

// Response (201 Created)
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "quantity": 25,
    "category": "Electronics",
    "sku": "LAP-001",
    "isActive": true,
    "createdAt": "2024-11-04T10:30:00Z",
    "updatedAt": "2024-11-04T10:30:00Z"
  }
}
```

## License

MIT License - feel free to use this project as a template for your own applications.

## Support

For issues or questions, please open an issue on GitHub.
