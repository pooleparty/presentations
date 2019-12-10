import React from "react";
import "./CrazyHeading.css";

export default ({ children }) => (
  <div className="crazy-heading__container">
    <h1 className="crazy-title">{children}</h1>
  </div>
);
