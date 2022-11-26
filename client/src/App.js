import React from "react";
import Index from "./pages/index";
import Products from "./pages/products";
import Cart from "./pages/cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Index />}></Route>
                <Route exact path="/product" element={<Products />}></Route>
                <Route exact path="/cart" element={<Cart />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
