import React from "react";
import "./BigButton.css";

const BigButton = ({ label, onClick }) => {
  return (
    <button className="big-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default BigButton;