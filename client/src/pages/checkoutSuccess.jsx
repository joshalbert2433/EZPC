import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function CheckoutSuccess() {
	return (
		<>
			<Helmet>
				<title>EZPC | Checkout</title>
			</Helmet>
			<div className="flex">
				<div className="bg-base-100 p-6 w-full md:w-fit md:mx-auto">
					<svg
						viewBox="0 0 24 24"
						className="text-green-600 w-16 h-16 mx-auto my-6"
					>
						<path
							fill="currentColor"
							d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
						></path>
					</svg>
					<div className="text-center">
						<h3 className="md:text-2xl text-base font-semibold text-center">
							Checkout Done!
						</h3>
						<p className=" my-2 md:text-3xl">
							Thank you for your order!
						</p>

						<div className="py-10 text-center">
							<Link to="/orders" className="btn btn-primary">
								View Orders
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CheckoutSuccess;
