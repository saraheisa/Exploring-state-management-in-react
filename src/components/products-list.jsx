import React from "react";
import PageNotFound from "./common/page-not-found";
import ProductCard from "./product-card";

export default function ProductList({ products }) {
  if (products.length === 0) return <PageNotFound />;

  return (
    <section id="products">
      {products.map((p) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </section>
  );
}
