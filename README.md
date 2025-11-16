# 🧩 Week 2: Express.js RESTful API – Product Management


This project implements a simple **RESTful API** for managing products using **Express.js**.  
It includes CRUD operations, middleware for logging, authentication, error handling, and advanced features like filtering, pagination, and search.

---

## 🚀 Features

- 🧱 CRUD operations for products (Create, Read, Update, Delete)
- 🔐 API key authentication
- 🪵 Custom request logging middleware
- ⚠️ Centralized error handling
- 🔎 Filtering, searching, and pagination support
- 📊 Product statistics endpoint

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <https://github.com/PLP-MERN-Stack-Development/express-js-server-side-framework-Jsews.git>
cd week2_assignment

2. Install dependencies
npm install

3. Start the server
node server.js


You should see:

🚀 Server running on http://localhost:3000

4. Test using Postman, Insomnia, or curl

Example:

curl http://localhost:3000/api/products

🔑 Authentication

Some routes require an API key for access.
Add this header in your requests:

x-api-key: mysecretkey


Without it, you’ll get a 401 Unauthorized error.

🧭 API Endpoints
1️⃣ GET /

Description: Welcome message
Example:

GET http://localhost:3000/


Response:

Welcome to the Product API! Go to /api/products to see all products.

2️⃣ GET /api/products

Description: Get all products with optional filters and pagination
Query Parameters:

Parameter	Description	Example
category	Filter by category	?category=electronics
page	Page number	?page=2
limit	Items per page	?limit=5
search	Search by product name	?search=laptop

Example:

GET http://localhost:3000/api/products?category=electronics&page=1&limit=2


Response:

{
  "total": 3,
  "page": 1,
  "limit": 2,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}

3️⃣ GET /api/products/:id

Description: Get a product by its ID
Example:

GET http://localhost:3000/api/products/1


Response:

{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}

4️⃣ POST /api/products

🔐 Protected (requires x-api-key)

Description: Add a new product
Example:

POST http://localhost:3000/api/products
Headers:
  Content-Type: application/json
  x-api-key: mysecretkey

Body:
{
  "name": "Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "price": 150,
  "category": "electronics",
  "inStock": true
}


Response:

{
  "id": "uuid-generated",
  "name": "Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "price": 150,
  "category": "electronics",
  "inStock": true
}

5️⃣ PUT /api/products/:id

🔐 Protected (requires x-api-key)

Description: Update an existing product
Example:

PUT http://localhost:3000/api/products/1
Headers:
  Content-Type: application/json
  x-api-key: mysecretkey

Body:
{
  "price": 1100,
  "inStock": false
}


Response:

{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1100,
  "category": "electronics",
  "inStock": false
}

6️⃣ DELETE /api/products/:id

🔐 Protected (requires x-api-key)

Description: Delete a product
Example:

DELETE http://localhost:3000/api/products/3
Headers:
  x-api-key: mysecretkey


Response:

{ "message": "Product deleted successfully" }

7️⃣ GET /api/stats

Description: Get statistics of products (count by category)
Example:

GET http://localhost:3000/api/stats


Response:

{
  "totalProducts": 3,
  "countByCategory": {
    "electronics": 2,
    "kitchen": 1
  }
}

⚠️ Error Responses
Code	Description	Example
400	Bad Request (missing fields)	{ "error": "Missing required fields" }
401	Unauthorized (no API key)	{ "error": "Unauthorized. Invalid or missing API key." }
404	Not Found	{ "error": "Product not found" }
500	Internal Server Error	{ "error": "Internal Server Error" }
🧪 Testing Tools

Postman

Insomnia

curl (Command line)

🧰 Dependencies

express

body-parser

uuid

Install with:

npm install express body-parser uuid

📄 License

This project is for educational purposes as part of the Week 2 Express.js Assignment.

👩‍💻 Author: Janice Tusiime Sewava
📅 Date: Week 2 Assignment
🏫 Course: Backend Development with Express.js
