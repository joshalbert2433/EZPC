import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { User } from "../services/reducers/userInfo";
import Ecomm from "../api/Ecomm.api";
import { toastError } from "../components/toaster";
import { getError } from "../services/utils/getError";
import { ChevronDown } from "react-feather";
import { themeChange } from "theme-change";
import AvatarDefault from "../assets/images/avatarDefault.png";

function NavBar() {
	const { state, dispatch: ctxDispatch } = useContext(User);
	const themeLocal = localStorage.getItem("theme") || "light";
	const [theme, setTheme] = useState(themeLocal);
	const [signoutLoader, setSigoutLoader] = useState(false);
	const { userInfo, cart } = state;

	const cartItemsLocal = cart.cartItems;

	const updateCart = async () => {
		try {
			await Ecomm.post(
				"cart/register",
				{
					cartItems: cartItemsLocal,
					user: userInfo._id,
				},
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);
		} catch (error) {
			toastError(getError(error));
			console.log(error);
		}
	};

	useEffect(() => {
		themeChange(false);
		// 👆 false parameter is required for react project
	}, []);

	useEffect(() => {
		// console.log(theme);
	}, [theme]);

	const handlerSignout = async () => {
		try {
			setSigoutLoader(true);
			await updateCart();
			ctxDispatch({ type: "USER_SIGNOUT" });

			localStorage.removeItem("userInfo");
			localStorage.removeItem("cartItems");
			setSigoutLoader(false);
		} catch (error) {
			console.log(error);
			toastError(getError(error));
		}

		// window.location.href = "/login";

		// navigate("/");
	};

	return (
		<>
			<div className="bg-base-100 shadow-lg navbar mb-4 sticky top-0 z-10">
				<div className="w-[1200px] mx-auto gap-4 flex [&>*]:items-center [&>*]:inline-flex">
					<div className="flex-1">
						<Link
							to={{ pathname: "/" }}
							className="btn btn-ghost normal-case text-4xl"
						>
							<span className="text-primary">EZ</span>PC
						</Link>
					</div>

					<div className="gap-8 [&>*]:font-medium ">
						<Link to="/" className="hover:text-primary">
							Products
						</Link>
						{userInfo ? (
							<>
								<Link
									to="/orders"
									className="hover:text-primary"
								>
									Orders
								</Link>
								<Link
									to="/address"
									className="hover:text-primary"
								>
									Address
								</Link>
							</>
						) : null}
					</div>

					{userInfo && userInfo.isAdmin && (
						<div className="flex-none ml-4">
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="flex font-medium"
								>
									Admin <ChevronDown />
								</label>
								<ul
									tabIndex={0}
									className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-32 gap-2 border border-neutral"
								>
									<li>
										<Link to="/dashboard/orders">
											Orders
										</Link>
									</li>
									<li>
										<Link to="/dashboard/products">
											Products
										</Link>
									</li>
								</ul>
							</div>
						</div>
					)}

					{/*THEME CHANGE */}
					<div className="ml-12">
						<label className="swap swap-rotate ">
							<input
								type="checkbox"
								data-toggle-theme="dark,light" // NOT WORKING ON STRICTTMODE
								data-act-class="ACTIVECLASS"
							/>

							<svg
								className={
									theme === "dark"
										? "swap-off fill-current w-7 h-7"
										: "swap-on fill-current w-7 h-7"
								}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
							</svg>
							<svg
								className={
									theme === "light"
										? "swap-off fill-current w-7 h-7"
										: "swap-on fill-current w-7 h-7"
								}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
							</svg>
						</label>
					</div>

					{userInfo ? (
						<div className="flex-none">
							<div className="dropdown dropdown-end">
								<Link
									to="/cart"
									tabIndex={0}
									className="btn btn-ghost btn-circle"
								>
									<div className="indicator">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
										{cart.cartItems.length !== 0 ? (
											<span className="badge badge-sm indicator-item">
												{cart.cartItems.length}
											</span>
										) : null}
									</div>
								</Link>
							</div>
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="btn btn-ghost btn-circle avatar"
								>
									<div className="w-10 rounded-full">
										<img src={AvatarDefault} alt="avatar" />
									</div>
								</label>
								<ul
									tabIndex={0}
									className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-2 border border-neutral"
								>
									<li className="w-full">
										<div className="hover:bg-base-200 bg-base-200 cursor-default flex-col gap-0  ">
											<p>Hello </p>
											<p>{userInfo.email}</p>
										</div>
									</li>
									<li
										onClick={
											!signoutLoader && handlerSignout
										}
										className="text-center self-center "
									>
										{signoutLoader ? (
											<p className="cursor-not-allowed">
												Logging out...
											</p>
										) : (
											<p>Logout</p>
										)}
									</li>
								</ul>
							</div>
						</div>
					) : (
						<Link to="login" className="btn btn-primary">
							Login
						</Link>
					)}
				</div>
			</div>
		</>
	);
}

export default NavBar;
