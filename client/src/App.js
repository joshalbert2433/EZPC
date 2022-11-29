import React from "react";
import Index from "./pages/index";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Login from "./pages/user/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/user/signUp";
import Orders from "./pages/admin/orders";
import OrderShow from "./pages/admin/orderShow";
import AdminProducts from "./pages/admin/products";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Index />}></Route>
                <Route exact path="/product" element={<Products />}></Route>
                <Route exact path="/cart" element={<Cart />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/sign-up" element={<SignUp />}></Route>
                <Route
                    exact
                    path="/dashboard/orders"
                    element={<Orders />}
                ></Route>
                <Route
                    exact
                    path="/orders/show"
                    element={<OrderShow />}
                ></Route>
                <Route
                    exact
                    path="/dashboard/products"
                    element={<AdminProducts />}
                ></Route>
            </Routes>
        </Router>
    );
}

export default App;
