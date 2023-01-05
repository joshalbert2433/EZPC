import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Login from "./pages/user/login";
import SignUp from "./pages/user/signUp";
import Orders from "./pages/admin/orders";
import OrderShow from "./pages/orderShow";
import OrdersUser from "./pages/orders";
import AdminProducts from "./pages/admin/products";
import AdminLogin from "./pages/admin/login";
import Address from "./pages/address";
import Checkout from "./pages/checkout";
import NavBar from "./pages/partials/navBar";
import ProtectedRoutes from "./routes/protectedRoutes";

function App() {
	return (
		<>
			<Router>
				<NavBar />
				<main>
					<Routes>
						{/* USER ROUTES */}
						<Route exact path="/" element={<Index />}></Route>
						<Route
							exact
							path="/:product"
							element={<Products />}
						></Route>
						<Route exact path="/login" element={<Login />}></Route>
						<Route
							exact
							path="/sign-up"
							element={<SignUp />}
						></Route>
						<Route
							exact
							path="/cart"
							element={
								<ProtectedRoutes>
									<Cart />
								</ProtectedRoutes>
							}
						></Route>
						<Route
							exact
							path="/address"
							element={
								<ProtectedRoutes>
									<Address />
								</ProtectedRoutes>
							}
						></Route>
						<Route
							exact
							path="/checkout"
							element={
								<ProtectedRoutes>
									<Checkout />
								</ProtectedRoutes>
							}
						></Route>
						<Route
							exact
							path="/orders"
							element={
								<ProtectedRoutes>
									<OrdersUser />
								</ProtectedRoutes>
							}
						></Route>
						<Route
							exact
							path="/orders/show"
							element={
								<ProtectedRoutes>
									<OrderShow />
								</ProtectedRoutes>
							}
						></Route>

						{/* ADMIN ROUTES */}
						<Route
							exact
							path="/dashboard/orders"
							element={<Orders />}
						></Route>
						<Route
							exact
							path="/dashboard/products"
							element={<AdminProducts />}
						></Route>
						<Route
							exact
							path="admin/login"
							element={<AdminLogin />}
						></Route>

						<Route element={<p>Not Found</p>}></Route>
					</Routes>
				</main>
			</Router>

			{/* ADD FOOTER HERE */}
		</>
	);
}

export default App;
