import React from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { TextBlock, RoundShape } from "react-placeholder/lib/placeholders";

export default function PlaceholderWrapper({ ready, children }) {
  const cardPlaceholder = (
    <div className="my-awesome-placeholder">
      <RoundShape
        style={{ width: 100, height: 100, marginBottom: 10 }}
        color="grey"
      />
      <TextBlock rows={7} color="grey" />
    </div>
  );

  return (
    <ReactPlaceholder
      customPlaceholder={cardPlaceholder}
      showLoadingAnimation
      ready={ready}
    >
      {children}
    </ReactPlaceholder>
  );
}
