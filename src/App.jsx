import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";
import Spinner from "./Spinner";

const REQUEST_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
};

export default function App() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.PENDING);

  useEffect(() => {
    getProducts("shoes")
      .then((data) => {
        setProducts(data);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      })
      .catch((err) => setRequestStatus(REQUEST_STATUS.ERROR));
  }, []);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === +size))
    : products;

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {size && <h2>Found {filteredProducts.length} items:</h2>}
          </section>
          {requestStatus === REQUEST_STATUS.PENDING && <Spinner />}
          {requestStatus === REQUEST_STATUS.ERROR && <p>Error!</p>}
          <section id="products">{filteredProducts.map(renderProduct)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
