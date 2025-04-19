# Cartopia

Cartopia is a full-stack e-commerce web application designed to provide a seamless shopping experience. The project consists of a React-based frontend and a Node.js/Express backend with MongoDB as the database. It supports user and seller functionalities, product management, cart operations, order processing, and payment integration.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Frontend](#frontend)
- [Backend](#backend)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Project Overview

Cartopia is an online marketplace where users can browse products, add them to their cart, place orders, and sellers can manage their products and orders. The application features user authentication, product categories, address management, and payment processing using Stripe.

---

## Tech Stack

### Frontend

- **React 19** - UI library for building interactive user interfaces
- **Vite** - Fast frontend build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Notification library for user feedback

### Backend

- **Node.js & Express 5** - Server-side runtime and web framework
- **MongoDB & Mongoose** - NoSQL database and object modeling
- **Cloudinary** - Cloud-based image and media management
- **Stripe** - Payment processing
- **JWT (jsonwebtoken)** - Authentication via JSON Web Tokens
- **bcryptjs** - Password hashing
- **Multer** - Handling file uploads
- **Cors** - Cross-Origin Resource Sharing
- **Cookie-Parser** - Parsing cookies
- **dotenv** - Environment variable management

---

## Frontend

The frontend is built with React and uses Vite as the build tool. It features:

- Component-based architecture with reusable components such as Navbar, ProductCard, Cart, Login, etc.
- React Router for navigation between pages like Home, Product Details, Cart, My Orders, Seller Dashboard, etc.
- Tailwind CSS for responsive and modern styling.
- Axios for communicating with the backend API.
- React Hot Toast for displaying notifications.

---

## Backend

The backend is an Express server that provides RESTful APIs for:

- User and Seller authentication and management
- Product CRUD operations
- Cart management
- Order processing and payment integration with Stripe
- Address management
- Image upload and management via Cloudinary

It uses MongoDB as the database with Mongoose for schema modeling. Middleware includes authentication checks, CORS configuration, cookie parsing, and JSON body parsing.

---

## Folder Structure

```
/
├── client/                 # React frontend source code
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # React components
│   │   ├── context/        # React context for state management
│   │   ├── pages/          # React pages for routing
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite configuration
│
├── server/                 # Express backend source code
│   ├── configs/            # Configuration files (DB, Cloudinary, Multer)
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Express middlewares (auth, etc.)
│   ├── models/             # Mongoose models
│   ├── routes/             # Express route definitions
│   ├── server.js           # Backend entry point
│   ├── package.json        # Backend dependencies and scripts
│
├── README.md               # Project documentation (this file)
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- MongoDB instance (local or cloud)
- Cloudinary account for image uploads


### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Cartopia
```

2. Setup Backend:

```bash
cd server
npm install
```

3. Setup Frontend:

```bash
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```
PORT=3001
MONGODB_URI=<your-mongodb-connection-string>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
JWT_SECRET=<your-jwt-secret>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
```

### Running the Application

- Start the backend server:

```bash
cd server
npm run server
```

- Start the frontend development server:

```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173` and will communicate with the backend API running on `http://localhost:3001`.

---

## Scripts

### Frontend (client)

- `npm run dev` - Start development server
- `npm run build` - Build production assets
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (server)

- `npm start` - Start server
- `npm run server` - Start server with nodemon for development

---

## License

This project is licensed under the ISC License.

---

This README provides a comprehensive overview of the Cartopia project, its tech stack, structure, and instructions to get started with development and deployment.
