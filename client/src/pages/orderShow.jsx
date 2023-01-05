import React, { useEffect } from "react";
import Ecomm from "../api/Ecomm.api";
import { useLocation } from "react-router-dom";

function OrderShow() {
	const { state: orderData } = useLocation();
	const { shipping_address, billing_address } = orderData.data;

	// const { id } = state;

	const getOrderById = async (orderId) => {
		try {
			const response = await Ecomm.get();
		} catch (error) {}
	};

	useEffect(() => {});
	console.log(orderData);

	return (
		<>
			{orderData ? (
				<div className="xl:w-[1200px] mx-auto flex flex-col gap-4">
					<div className="flex flex-col max-w-full p-6 space-y-4 sm:p-4 sm:px-6 bg-base-100 shadow-lg">
						<h2 className="text-xl font-semibold">
							Order ID: {orderData.data.orderId}
						</h2>
						<div className="flex">
							<div className="w-1/2">
								<h3 className="font-semibold">
									Customer Shipping Info:
								</h3>
								<p>
									Name: {shipping_address.first_name}{" "}
									{shipping_address.last_name}
								</p>
								<p>Address: {shipping_address.address}</p>
								<p>City: {shipping_address.city}</p>
								<p>State: {shipping_address.state}</p>
								<p>Zip Code: {shipping_address.zip_code}</p>
							</div>
							<div className="w-1/2">
								<h3 className="font-semibold">
									Customer Billing Info:
								</h3>
								<p>
									Name: {billing_address.first_name}{" "}
									{billing_address.last_name}
								</p>
								<p>Address: {billing_address.address}</p>
								<p>City: {billing_address.city}</p>
								<p>State: {billing_address.state}</p>
								<p>Zip Code: {billing_address.zip_code}</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col max-w-full p-6 space-y-4 sm:p-4 sm:px-6 bg-base-100 shadow-lg">
						<h2 className="text-xl font-semibold">
							{orderData.data.status}
						</h2>
						<ul className="flex flex-col divide-y divide-gray-700">
							{orderData && orderData.length !== 0
								? orderData.data.orderItems.map(
										(data, index) => {
											return (
												<li
													className="flex flex-col py-6 sm:flex-row sm:justify-between"
													key={data._id}
												>
													<div className="flex w-full space-x-2 sm:space-x-4">
														<img
															className="flex-shrink-0 border object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
															src={
																data.product
																	.image[
																	data.product
																		.image_main
																]
															}
															alt="Polaroid camera"
														/>
														<div className="flex flex-col justify-between w-full pb-4">
															<div className="flex justify-between w-full pb-2 space-x-2">
																<div className="space-y-1">
																	<h3 className="text-lg font-semibold leading-snug sm:pr-8 line-clamp-2">
																		{
																			data
																				.product
																				.name
																		}
																	</h3>
																</div>
																<div className="text-right">
																	<p className="text-lg font-semibold text-secondary">
																		{data
																			.product
																			.price *
																			data.quantity}
																		&#36;
																	</p>
																</div>
															</div>
															<div className="flex text-sm font-semibold">
																<p>
																	X{" "}
																	{
																		data.quantity
																	}
																</p>
															</div>
														</div>
													</div>
												</li>
											);
										}
								  )
								: null}
						</ul>
						<div className="space-y-1 text-right">
							<p>
								Order Total:{" "}
								<span className="font-semibold text-secondary text-xl">
									&#36;{orderData.data.total_price}
								</span>
							</p>
						</div>
						<div className="flex justify-end space-x-4">
							<button
								type="button"
								className="px-6 py-2 border rounded-md btn-sm btn sm:btn-md btn-primary w-full sm:w-fit"
							>
								Shop More
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

export default OrderShow;
