import React, { useState } from "react";
import { getProducts } from "../services/productService";
import useFetch, { REQUEST_STATUS } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { category } from "../helpers/consts/url-params";
import PlaceholderWrapper from "./common/placeholder-wrapper";
import ProductList from "./products-list";
import Filters from "./filters";

export default function Products() {
  const [size, setSize] = useState("");
  const { [category]: categoryName } = useParams();
  const { data: products, requestStatus } = useFetch(getProducts, categoryName);

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === +size))
    : products;

  return (
    <>
      <Filters size={size} setSize={setSize} products={filteredProducts} />

      {requestStatus === REQUEST_STATUS.ERROR && <p>Error!</p>}

      <PlaceholderWrapper ready={requestStatus === REQUEST_STATUS.SUCCESS}>
        <ProductList products={filteredProducts} />
      </PlaceholderWrapper>
    </>
  );
}
