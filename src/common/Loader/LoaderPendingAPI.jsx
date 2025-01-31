import React from "react";

export const LoaderForPendingApi = () => {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional overlay effect
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 9999, // Ensure it's above other content
  };

  const spinnerStyle = {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(0, 0, 0, 0.1)",
    borderTopColor: "#3498db", // Spinner color
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={loaderContainerStyle}>
      <div style={spinnerStyle}></div>
      {/* Keyframes must be handled globally; see below */}
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};
