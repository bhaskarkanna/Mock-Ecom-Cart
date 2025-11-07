
# 🛒 Vibe Commerce – Full Stack E-Commerce Cart

A **Full Stack E-Commerce Cart Application** built as part of the **Nexora Internship Technical Assignment**.  
This project demonstrates complete **frontend, backend, and database integration** using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It mimics a real-world e-commerce experience — product browsing, cart management, and checkout simulation.
---

## **Table of Contents**

1. Introduction
2. Objective
3. Project Scope
4. Technology Stack
5. System Architecture
6. Frontend Implementation
7. Backend Implementation
8. Database Design
9. API Endpoints
10. Features Implemented
11. Workflow Explanation
12. User Interface Screenshots
13. Output and Testing
14. Challenges Faced & Solutions
15. Conclusion
16. Future Enhancements
17. GitHub Repository
18. Acknowledgement

---

## **1. Introduction**

The **Full Stack E-Commerce Cart Project (Vibe Commerce)** was developed as part of the Nexora Internship technical assessment.
This project demonstrates an **end-to-end MERN stack web application** capable of managing product listings, a user cart, and a mock checkout process.

It mimics the functionality of a modern e-commerce system while focusing on clean architecture, smooth data flow, and responsive UI.
This project proves how both frontend and backend work in harmony to deliver dynamic, real-time functionality to users.

---

## **2. Objective**

The main objective is to **build a functional e-commerce cart** using modern web technologies.
Specific goals include:

* Creating an interactive product catalog.
* Enabling users to add/remove items from a virtual cart.
* Updating cart totals dynamically without page reloads.
* Allowing a checkout process that simulates real-world online purchase flow.
* Demonstrating API integration, database connectivity, and responsive design.

---

## **3. Project Scope**

The project is designed to be scalable and modular for real-world adaptation.

* The **frontend** handles user interaction and visualization.
* The **backend** manages data exchange and business logic.
* The **database** stores and retrieves persistent product data.

This version focuses on a single-user mock cart system but can easily evolve into a **multi-user full-scale e-commerce platform**.

---

## **4. Technology Stack**

| Layer        | Technology Used               | Purpose                                   |
| ------------ | ----------------------------- | ----------------------------------------- |
| **Frontend** | React.js, Tailwind CSS, Axios | User interface, dynamic rendering         |
| **Backend**  | Node.js, Express.js           | API creation and request handling         |
| **Database** | MongoDB (Mongoose)            | Product and cart data storage             |
| **Tools**    | VS Code, Postman, Git, GitHub | Development, testing, and version control |

Each layer communicates via **RESTful API architecture**, ensuring high modularity and maintainability.

---

## **5. System Architecture**

The architecture follows **MVC (Model–View–Controller)** principles:

* **Model:** Defines MongoDB schemas for products and cart items.
* **View:** React components that render data dynamically.
* **Controller:** Express routes that handle CRUD operations and checkout logic.

This separation ensures clean, scalable, and testable code.

**Data Flow:**

1. Frontend sends API requests (GET, POST, DELETE) via Axios.
2. Backend (Express.js) receives and processes requests.
3. MongoDB fetches or updates the required data.
4. Processed data is sent back as a JSON response to frontend.

---

## **6. Frontend Implementation**

The **React.js** frontend is structured into reusable components:

* `ProductList.js` – Displays products dynamically.
* `CartView.js` – Handles cart items, quantity, and price updates.
* `CheckoutModal.js` – Collects user details and displays confirmation.
* `App.js` – Main layout connecting routes and global state.

**Core Concepts Used:**

* React Hooks (`useState`, `useEffect`)
* Context API for global cart state management
* Axios for fetching backend data
* Tailwind CSS for responsive, clean UI

**Design Focus:**

* Simplicity and responsiveness.
* Interactive buttons and live updates.
* Clean typography and visual hierarchy.



**Frontend setup**
  cd frontend
  npm install
  npm start

  Runs on: http://localhost:3000
---

## **7. Backend Implementation**

The **Node.js + Express.js** backend forms the application’s logic layer.

**Functionalities:**

* Fetch products from database.
* Add and remove items in the cart.
* Calculate totals automatically.
* Handle checkout and generate mock order summary.

**Key Middleware Used:**

* `cors()` – Enables frontend-backend communication.
* `express.json()` – Parses JSON request bodies.
* `mongoose` – Connects to MongoDB database.

  
**Backend setup**
   cd backend
   npm install
   npm start
   
    Runs on: http://localhost:5000
   
**Example Code Snippet (Express route):**

```js
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

   
---

## **8. Database Design**

The project uses **MongoDB Atlas** for cloud-based storage.
Data models are defined using **Mongoose schemas**.

**Product Schema:**

```js
{
  name: String,
  category: String,
  price: Number,
  image: String
}
```

**Cart Schema:**

```js
{
  productId: ObjectId,
  quantity: Number
}
```

This schema design allows future expansion such as adding users, orders, and authentication.

---

## **9. API Endpoints**

| Method     | Endpoint    | Description                       |
| ---------- | ----------- | --------------------------------- |
| **GET**    | `/products` | Fetch all products                |
| **POST**   | `/cart`     | Add item to cart                  |
| **DELETE** | `/cart/:id` | Remove item from cart             |
| **POST**   | `/checkout` | Process mock checkout and receipt |

Each endpoint returns **JSON data**, ensuring easy frontend integration.

---

## **10. Features Implemented**

* 🛍️ Product listing with images and pricing
* ➕ Add to Cart & ➖ Remove from Cart
* 🔁 Quantity adjustment
* 💰 Dynamic total and subtotal calculation
* 🧾 Checkout popup and PDF receipt generation
* 📱 Fully responsive UI

---

## **11. Workflow Explanation**

1. **Product Retrieval:**
   Frontend fetches products via `/products` API and displays them.

2. **Cart Update:**
   When “Add to Cart” is clicked, a POST request updates the cart.

3. **Cart Management:**
   Users can increment/decrement quantity and view total price.

4. **Checkout Process:**
   User provides details → Order summary is displayed → PDF receipt is generated.

  Order ID: ORD-1762498536867
Customer: K Bhaskar (bhaskarkanna924@gmail.com)
-----------------------------------------
Item                   Qty   Price
-----------------------------------------
Classic Denim Jacket     1    ₹59.99
Wireless Earbuds         1    ₹39.99
Stainless Travel Mug     1    ₹14.99
Minimalist Backpack      1    ₹49.99
Smart Fitness Band       1    ₹29.99
Running Shoes            1    ₹69.99
-----------------------------------------
Total Amount: ₹264.94


---

## **12. User Interface Screenshots**

(Insert your 6 screenshots here in order)

* Home Page – Product Display
* Product Grid Continued
* Cart Filled with Items
* Checkout Modal
* Order Confirmation Receipt
* Downloadable PDF Receipt

Add each screenshot on a new page with captions like:
*“Figure 1: Homepage view showing available products”*

---

## **13. Output and Testing**

* Tested API endpoints using **Postman**.
* Verified frontend-backend data consistency.
* Ensured cart updates reflect instantly.
* Validated UI responsiveness on desktop and mobile.

**Result:**
All features work successfully, meeting the assignment objectives.

---

## **14. Challenges Faced & Solutions**

| Challenge                      | Solution                                     |
| ------------------------------ | -------------------------------------------- |
| Integrating frontend & backend | Used CORS and Axios for proper communication |
| State management for cart      | Implemented React Context API                |
| Dynamic UI rendering           | Used React hooks (`useEffect`, `useState`)   |
| Image responsiveness           | Handled with Tailwind CSS grid layout        |

---

## **15. Conclusion**

The **Vibe Commerce Full Stack E-Commerce Cart** demonstrates a strong grasp of MERN stack fundamentals and web development principles.
It efficiently combines backend logic, database handling, and a user-friendly frontend interface.

This project highlights:

* Modular and scalable coding structure.
* Real-time interactivity and dynamic updates.
* Clean UI and optimized performance.

---

## **16. Future Enhancements**

Potential upgrades include:

* Implementing **user authentication**.
* Adding **order history** and **payment integration**.
* Deploying on cloud (Vercel + MongoDB Atlas).
* Integrating an admin dashboard for inventory management.

---

## **17. GitHub Repository**

🔗  https://github.com/bhaskarkanna/Mock-Ecom-Cart




