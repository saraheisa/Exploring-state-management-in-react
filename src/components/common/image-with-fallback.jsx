import React, { useState } from "react";

export default function ImageWithFallback({ src, ...props }) {
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
