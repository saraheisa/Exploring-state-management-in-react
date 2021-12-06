import React from "react";
import ImageWithFallback from "./common/image-with-fallback";

export default function ProductCard({ product }) {
  const { name, image, price } = product;
  return (
    <div className="product">
      <a href="/">
        <ImageWithFallback src={`./images/${image}`} alt={name} />
        <h3>{name}</h3>
        <p>${price}</p>
      </a>
    </div>
  );
}
