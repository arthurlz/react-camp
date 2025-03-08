import React from "react";
import ThemeProvider from "./ThemeProvider";
import ChildComponent from "./ChildComponent";

const SampleContext = () => {
  return (
    <ThemeProvider>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 style={{color: 'blue'}}>React Context示例</h2>
        <ChildComponent />
      </div>
    </ThemeProvider>
  );
};

export default SampleContext;
