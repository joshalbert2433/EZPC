import React, { useEffect, useContext, useState } from "react";
import Ecomm from "../api/Ecomm.api";
import { User } from "../services/reducers/userInfo";
import { Link, useNavigate } from "react-router-dom";

function Orders() {
	const { state: ctxState, dispatch: ctxDispatch } = useContext(User);
	const [orderData, setOrderData] = useState();
	const { userInfo } = ctxState;
	const navigate = useNavigate();

	const getByUserId = async (userId) => {
		try {
			const response = await Ecomm.get(`orders/${userId}`);
			setOrderData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getByUserId(userInfo._id);
	}, []);

	console.log(orderData);

	console.log(userInfo);
	return (
		<div className="xl:w-[1200px] mx-auto flex flex-col-reverse gap-4">
			{orderData && orderData.data.length !== 0
				? orderData.data.map((data, index) => {
						return (
							<div
								className="flex flex-col max-w-full p-6 space-y-4 sm:p-4 sm:px-6 bg-base-100 shadow-lg"
								key={data._id}
							>
								<h2 className="text-xl font-semibold">
									{data.status}
								</h2>
								<ul className="flex flex-col divide-y divide-gray-700">
									<li className="flex flex-col py-6 sm:flex-row sm:justify-between">
										<div className="flex w-full space-x-2 sm:space-x-4">
											<img
												className="flex-shrink-0 border object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
												src={
													data.orderItems[0].product
														.image[
														data.orderItems[0]
															.product.image_main
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
																	.orderItems[0]
																	.product
																	.name
															}
														</h3>
													</div>
												</div>
												<div className="flex text-sm font-semibold">
													<p>
														X{" "}
														{
															data.orderItems[0]
																.quantity
														}
													</p>
												</div>
											</div>
										</div>
									</li>
								</ul>
								<div className="space-y-1 text-right">
									<div className="flex justify-between items-center">
										<p>{data.orderItems.length} item(s)</p>
										<p>
											Order Total:{" "}
											<span className="font-semibold text-secondary text-xl">
												&#36;{data.total_price}
											</span>
										</p>
									</div>
								</div>
								<div className="flex justify-end space-x-4">
									<Link
										to={`/orders/show`}
										state={{ data }}
										type="button"
										className="px-6 py-2 border rounded-md btn-sm btn sm:btn-md btn-primary w-full sm:w-fit"
										// onClick={navigate(
										// 	`/orders/show?id=${data.orderId}`
										// )}
										// to={`/product?name=${data.name}&&id=${data._id}&&category=${data.category[0]}`}
									>
										View More Details
									</Link>
								</div>
							</div>
						);
				  })
				: null}
			{orderData?.data.length === 0 && (
				<div className="alert alert-info rounded-none shadow-lg">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="stroke-current flex-shrink-0 w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<span>No Orders Found</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default Orders;
