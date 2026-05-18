# E-commerce Frontend

A modern, responsive e-commerce frontend application built with React, Vite, and Tailwind CSS.

## 🔗 Links
- **Public GitHub Repository**: [https://github.com/VarunChandra04/fakestore](https://github.com/VarunChandra04/fakestore)
- **Live Deployed Demo**: [https://fakestore-8xecloi96-varunloh-s-projects.vercel.app](https://fakestore-8xecloi96-varunloh-s-projects.vercel.app)

## 🛠️ Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VarunChandra04/fakestore.git
   cd "E-commerce FrontEnd"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the app**:
   Open your browser and navigate to `http://localhost:5173/`.

## 🧠 Approach

- **Framework**: Built using React with Vite for fast HMR and optimized builds.
- **Styling**: Styled using Tailwind CSS (v4) for rapid UI development and a responsive, modern design.
- **Icons**: Used `lucide-react` for clean, consistent SVG icons throughout the app.
- **Routing**: Implemented client-side routing using `react-router-dom` for seamless navigation between Home, Products, and Cart pages.
- **State Management**: Used React's built-in Context API (`ProductContext` and `CartContext`) to manage global state for products fetching and shopping cart logic without over-complicating with external state management libraries.
- **Data Fetching**: Used `axios` to fetch product data from the [Fake Store API](https://fakestoreapi.com/).

## 💡 Assumptions Made

- **Authentication**: It is assumed that user authentication is not required for this MVP, so users can browse products and add to cart without logging in.
- **Backend & Data**: Relies on a static dummy API (Fake Store API). It is assumed this API is highly available, and any latency is simulated or acceptable for the demo.
- **Persistence**: The shopping cart is persisted using local storage (`localStorage`) so that users don't lose their cart items upon refreshing the page.
- **Checkout Flow**: The checkout button is currently a visual placeholder and does not process real payments or orders.
