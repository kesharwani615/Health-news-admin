import React from "react";

export const Loader = () => {
    const containerStyle = {
      display: "flex",
      justifyContent: "center",
    //   alignItems: "center",
      minHeight: "100vh", // Full-screen height
    };
  
    const spinnerStyle = {
      width: "64px", // Equivalent to Tailwind's `w-16`
      height: "64px", // Equivalent to Tailwind's `h-16`
      borderTop: "4px solid #3B82F6", // Tailwind's `border-blue-500`
      borderStyle: "solid",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    };
  
    return (
        <>
      <div style={{display:'flex',justifyContent:'center' }}>
        <div style={spinnerStyle}></div>
      </div>
      <style>
          {`
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
        </>
      
    );
  };
  