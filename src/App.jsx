import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./components/products";
import Cart from "./components/cart";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to carved rock fitness</h1>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:category" element={<Products />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
