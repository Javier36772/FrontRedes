import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./login.jsx";
import ProductManagement from "./ProductManagement.jsx";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f4f4f4" }}>
        

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/productos" element={<ProductManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;