import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";
import useFetch, { REQUEST_STATUS } from "./hooks/useFetch";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { TextBlock, RoundShape } from "react-placeholder/lib/placeholders";

function ImageWithFallback({ src, ...props }) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  function onError() {
    if (!error) {
      setImgSrc("/images/image-placeholder.png");
      setError(true);
    }
  }

  return <img src={imgSrc} {...props} onError={onError} />;
}

export default function App() {
  const [size, setSize] = useState("");
  const { data: products, requestStatus } = useFetch(getProducts, "shoes");

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <ImageWithFallback src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const cardPlaceholder = (
    <div className="my-awesome-placeholder">
      <RoundShape
        style={{ width: 100, height: 100, marginBottom: 10 }}
        color="grey"
      />
      <TextBlock rows={7} color="grey" />
    </div>
  );

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
          {/* {requestStatus === REQUEST_STATUS.PENDING && <Spinner />} */}
          {requestStatus === REQUEST_STATUS.ERROR && <p>Error!</p>}
          <ReactPlaceholder
            customPlaceholder={cardPlaceholder}
            showLoadingAnimation
            ready={requestStatus === REQUEST_STATUS.SUCCESS}
          >
            <section id="products">
              {filteredProducts.map(renderProduct)}
            </section>
          </ReactPlaceholder>
        </main>
      </div>
      <Footer />
    </>
  );
}
