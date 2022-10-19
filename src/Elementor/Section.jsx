import React from "react";

const Section = ({ children }) => {
  return (
    <div style={{ width: "100%", display: "flex", padding: "5px" }}>
      {children}
    </div>
  );
};

export default Section;
