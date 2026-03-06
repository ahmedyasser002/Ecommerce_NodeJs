# E-commerce Platform

## Overview

This project is a full-featured **E-commerce platform backend** built using:

* Node.js
* Express.js
* MongoDB

The platform supports **customers, sellers, and administrators** with functionalities such as product listings, shopping cart management, order processing, secure payments, and an admin dashboard.

The system follows the **MVC (Model-View-Controller) architecture** to maintain scalability and code organization.

---

# Features

## 1. User Management

* User registration and login
* Social login (Google authentication)
* Profile management (name, address, payment details)
* Wishlist and favorites
* Product reviews and ratings
* Order history
* Role-based access control:

  * Customer
  * Seller
  * Admin

---

## 2. Product Management

* Product categories
* Product listings with:

  * Images
  * Descriptions
  * Prices
* Stock availability tracking
* Product search by name
* Filtering by:

  * Price
  * Category
  * Availability

---

## 3. Shopping Cart & Checkout

* Add or remove products from cart
* Adjust product quantities
* Order summary with full price breakdown
* Guest checkout option
* Multiple payment methods:

  * Credit Card
  * PayPal
  * Cash on Delivery
  * Wallet
* Promo codes and discount system

---

## 4. Order Management

* Order placement
* Order confirmation
* Order tracking with status updates
* Email notifications for order updates

---

## 5. Admin Panel

Administrators can manage the entire platform:

* User management (approve/restrict users)
* Product and category management
* Order and shipping management
* Discount and promo code management
* Homepage and banner content management

---

## 6. Seller (Vendor) Management

* Seller registration and profile setup
* Product listing and inventory management
* Order processing and status updates
* Earnings and payout management

---

# Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JWT Authentication
* bcrypt password hashing

### Payment Integration

* Stripe
* PayPal

### Additional Tools

* Nodemon (development server)
* Multer (image uploads)
* Nodemailer (email notifications)

---

# Installation Guide

## 1. Clone the Repository

```bash
git clone https://github.com/ahmedyasser002/Ecommerce_NodeJs.git
cd Ecommerce_NodeJs
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Environment Variables

Create a `.env` file in the root directory like the uploaded `.env.example`.

Example:

```
PORT=5000

MONGO_URI=mongodb://localhost:27017/ecommerce_db

JWT_SECRET=secret_key

EMAIL_USER=example@gmail.com
EMAIL_PASS=your_email_password

STRIPE_SECRET_KEY=your_stripe_key
```

---

## 4. Run the Server

Development mode:

```bash
npm start
```

Server will start at:

```
http://localhost:5000
```

---

# Project Structure

```
Ecommerce_NodeJs
│
├── Config
│   └── db.config.js
│
├── Controllers
│
├── Models
│
├── Routes
│
├── Middleware
│
├── Services
│
│
├── app.js
├── package.json
└── README.md
```

---

# Git Workflow

The project follows **feature-based branching**.

Each feature is developed in its own branch.

Example:

```
feature/user-authentication
feature/product-management
feature/cart-checkout
feature/order-management
feature/payment-integration
feature/admin-panel
```

---

# Future Improvements

* Push notifications
* Email marketing and newsletters
* Loyalty and reward points system
* Social media sharing
* Multi-language support