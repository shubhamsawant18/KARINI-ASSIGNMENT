import React from "react";

const Spinner = () => {
  return (
    <div style={spinnerStyle}></div>
  );
};

const spinnerStyle = {
  width: "40px",
  height: "40px",
  border: "4px solid #e9ecef", 
  borderTop: "4px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "10px auto",
};


const styleElement = document.createElement("style");
styleElement.textContent = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(styleElement);

export default Spinner;
