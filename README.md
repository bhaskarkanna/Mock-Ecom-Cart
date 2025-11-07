# 🛒 Mock E-Com Cart — Full-Stack Application

A complete full-stack shopping cart web app built as part of a coding assessment for **Vibe Commerce**. This project demonstrates skills in **React, Node.js, Express, and MongoDB**, implementing key e-commerce workflows like adding/removing products, updating cart items, and performing a mock checkout (no real payments).

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Setup](#project-setup)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Folder Structure](#folder-structure)
8. [API Endpoints](#api-endpoints)
9. [Common Errors & Fixes](#common-errors--fixes)
10. [License](#license)

---

## 🧠 Overview

This project is a **Mock E-Commerce Cart** designed to mimic core shopping cart operations in a simplified environment. It demonstrates both **frontend-backend communication** and **database persistence** using REST APIs.

---

## ✨ Features

✅ Fetch list of available products
✅ Add or remove products from the cart
✅ Update product quantities
✅ View cart total dynamically
✅ Checkout summary page (mock)
✅ Responsive, clean UI built with React
✅ RESTful API for CRUD operations
✅ MongoDB for product & cart storage

---

## ⚙️ Tech Stack

**Frontend:** React, Axios, Tailwind CSS (optional), Vite or CRA
**Backend:** Node.js, Express.js
**Database:** MongoDB / MongoDB Atlas
**Version Control:** Git & GitHub
**Runtime:** npm / Node.js v18+

---

## 🏗 Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/MOCK-ECOM-CART.git
cd MOCK-ECOM-CART
```

### 2️⃣ Install dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

---

## 🧾 Environment Variables

Create a `.env` file in the **backend** directory.

Example:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecom-cart
JWT_SECRET=mocksecret
NODE_ENV=development
```

For frontend, if needed:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files to GitHub. Add them to `.gitignore`.

---

## ▶️ Running the Application

### Run backend server

```bash
cd backend
npm run dev
```

Server runs on: **[http://localhost:5000](http://localhost:5000)**

### Run frontend

```bash
cd frontend
npm run dev
```

Frontend runs on: **[http://localhost:5173](http://localhost:5173)** (Vite) or **[http://localhost:3000](http://localhost:3000)** (CRA)

---

## 🗂 Folder Structure

```
MOCK-ECOM-CART/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── config/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.js
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### 🛍 Products

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/api/products`     | Fetch all products      |
| GET    | `/api/products/:id` | Get single product      |
| POST   | `/api/products`     | Add product (Admin use) |
| PUT    | `/api/products/:id` | Update product          |
| DELETE | `/api/products/:id` | Delete product          |

### 🛒 Cart

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/api/cart`     | View cart items          |
| POST   | `/api/cart`     | Add product to cart      |
| PUT    | `/api/cart/:id` | Update quantity          |
| DELETE | `/api/cart/:id` | Remove product from cart |

---

## 🧰 Common Errors & Fixes

### ❌ `error: src refspec main does not match any`

➡️ Cause: No commits yet
✅ Fix:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

### ❌ `Compiled with problems` or blank page

➡️ Cause: Missing imports or API URL
✅ Fix:

* Check API URL in `.env`
* Restart frontend and backend servers

---

## 📄 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and share for learning or demonstration purposes.
