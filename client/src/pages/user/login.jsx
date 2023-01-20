import React, { useContext, useState } from "react";
import LoginBG from "../../assets/images/login_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../services/reducers/userInfo";
import Ecomm from "../../api/Ecomm.api";
import useLocalStorage from "../../hooks/useLocalStorage";
import "react-toastify/dist/ReactToastify.css";

import {
	ToasterContainer,
	toastError,
	toastInfo,
	toastSuccess,
} from "../../components/toaster";
import { getError } from "../../services/utils/getError";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userLocal, setUserInfoLocal] = useLocalStorage("userInfo");
	const [loading, setLoading] = useState(false);
	const [cartItemsLocal, setCartItemsLocal] = useLocalStorage(
		"cartItems",
		[]
	);
	const { state: ctxState, dispatch: ctxDispatch } = useContext(User);
	const { userInfo } = ctxState;

	const navigate = useNavigate();

	const getCartByUserId = async (userId, token) => {
		try {
			const response = await Ecomm.get(`cart/${userId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response) {
				setCartItemsLocal(response.data.cartItems);
				ctxDispatch({
					type: "INITIAL_CART_ITEM",
					payload: response.data.cartItems,
				});
			}
		} catch (error) {
			console.log("No cart item found");
			// console.log(error);
		}
	};

	const handlerSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await Ecomm.post("auth/sign-in", {
				email,
				password,
			});
			ctxDispatch({ type: "USER_SIGNIN", payload: response.data });
			setUserInfoLocal(response.data);

			await getCartByUserId(response.data._id, response.data.token);

			navigate("/");
		} catch (error) {
			toast.dismiss();

			toastError(getError(error));
		}
	};

	const adminLoginHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await Ecomm.post("auth/sign-in", {
				email: "test@email.com",
				password: "test@email.com",
			});
			ctxDispatch({ type: "USER_SIGNIN", payload: response.data });
			setUserInfoLocal(response.data);

			await getCartByUserId(response.data._id, response.data.token);
			setLoading(false);
			navigate("/");
		} catch (error) {
			toast.dismiss();

			toastError(getError(error));
		}
	};

	return (
		<>
			<Helmet>
				<title>EZPC | Login</title>
			</Helmet>
			<div className="w-[900px] mx-auto flex bg-base-100 rounded overflow-hidden">
				<div className=" w-1/2 min-h-[400px]">
					<img
						className="object-cover h-full"
						src={LoginBG}
						alt="background"
					/>
				</div>

				<div className="w-1/2 flex flex-col items-center justify-center">
					<h1 className="text-3xl font-semibold py-8">Login Page</h1>

					<form
						action="#"
						method="POST"
						className="space-y-6 w-[80%]"
						onSubmit={handlerSubmit}
					>
						<div>
							<label htmlFor="email" className="label">
								Email Address
							</label>
							<input
								type="text"
								name="email"
								placeholder="Email Address"
								className="input input-bordered w-full "
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="label">
								Password
							</label>
							<input
								type="password"
								name="password"
								placeholder="Password"
								className="input input-bordered w-full "
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<input
							type="submit"
							value="Login"
							className="btn btn-primary w-full"
						/>
					</form>
					<div className="divider w-[80%] mx-auto">OR</div>
					<div className="w-[80%]">
						<div
							className="tooltip tooltip-bottom w-full"
							data-tip="Admin login is visible for demo only!"
						>
							<button
								className="btn btn-secondary w-full "
								onClick={(e) => {
									setLoading(true);
									adminLoginHandler(e);
								}}
								// disabled={loading}
							>
								{loading ? (
									<div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin "></div>
								) : (
									"Admin Login"
								)}
							</button>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<p className="py-8">Don't have account?</p>
						<Link
							to={{ pathname: "/sign-up" }}
							className="link link-primary font-semibold no-underline"
						>
							Sign up
						</Link>
					</div>
				</div>
			</div>

			<ToasterContainer />
		</>
	);
}

export default Login;
