import React, { useEffect, useState, useContext } from "react";
import Ecomm from "../../api/Ecomm.api";
import { User } from "../../services/reducers/userInfo";
import { toastSuccess, ToasterContainer } from "../../components/toaster";
import { toast } from "react-toastify";
import Pagination from "../../components/pagination";
import { getError } from "../../services/utils/getError";
import { Helmet } from "react-helmet-async";

const OrderStatusOptions = [
	{ value: "Order in process", text: "Order in process" },
	{ value: "Shipped", text: "Shipped" },
	{ value: "Cancelled", text: "Cancelled" },
];

function Orders() {
	const { state: ctxState, dispatch: ctxDispatch } = useContext(User);
	const [orderData, setOrderData] = useState([]);
	const { userInfo } = ctxState;
	const [sort, setSort] = useState("");
	// const [filterCategory, setFilterCategory] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [status, setStatus] = useState("all");

	const getAllOrders = async () => {
		try {
			// orders?limit=10&page=1&status=
			const url = `orders?limit=${limit}&page=${page}&status=${status}`;
			const response = await Ecomm.get(url, {
				headers: { Authorization: `Bearer ${userInfo.token}` },
			});
			setOrderData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const updateOrderById = async (orderId, status) => {
		toast.dismiss();
		try {
			await Ecomm.patch(
				`orders/${orderId}`,
				{
					status: status,
				},
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);
			toastSuccess("Order Status has been updated");
		} catch (error) {
			toast.error(getError(error));
			console.log(error);
		}
	};

	useEffect(() => {
		getAllOrders();

		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		getAllOrders();
	}, [page, limit, status]);

	const changeOrderStatusHandler = (e, orderId) => {
		e.preventDefault();
		const { value } = e.target;
		updateOrderById(orderId, value);
	};

	return (
		<>
			<Helmet>
				<title>EZPC | Admin</title>
			</Helmet>
			<div className="w-[1200px] mx-auto">
				<div className="flex justify-between">
					{/* <div className="form-control">
						<div className="input-group">
							<input
								type="text"
								placeholder="Search…"
								className="input input-bordered"
							/>
							<button className="btn btn-square">
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
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
						</div>
					</div> */}
					<select
						className="select select-bordered w-full max-w-xs"
						name="sort"
						onChange={(e) => {
							setPage(1);
							setStatus(e.target.value);
						}}
						defaultValue={status}
					>
						<option value={"all"}>Show All</option>
						<option value={"Order in process"}>
							Order In Process
						</option>
						<option value={"Shipped"}>Shipped</option>
						<option value={"Cancelled"}>Cancelled</option>
					</select>
				</div>

				<div className="overflow-x-auto p-2 md:p-0 my-4">
					<div className="overflow-x-auto">
						<table className="table table-fixed w-full ">
							<thead className="">
								<tr className="text-gray-200 [&>*]:bg-neutral">
									<th className="w-[5%]">ID</th>
									<th className="w-[15%]">Name</th>
									<th className="w-[20%]">Date</th>
									<th className="w-[35%]">Billing Address</th>
									<th className="w-[8%]">Total</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{orderData?.data?.map((data) => {
									return (
										<tr key={data._id}>
											<th>{data.orderId}</th>
											<td>
												{
													data.shipping_address
														.first_name
												}{" "}
												{
													data.shipping_address
														.last_name
												}
											</td>

											<td>
												{new Date(data.createdAt)
													.toLocaleDateString("en-US")
													.toString()}
											</td>
											<td className="truncate">
												{data.billing_address.address}{" "}
												{data.billing_address.city}{" "}
												{data.billing_address.state}
											</td>
											<td>&#36;{data.total_price}</td>
											<td>
												<select
													className="select select-sm select-bordered"
													// value={data.status}
													name="status"
													onChange={(e) => {
														changeOrderStatusHandler(
															e,
															data.orderId
														);
													}}
													defaultValue={data.status}
												>
													{OrderStatusOptions.map(
														(item, index) => (
															<option key={index}>
																{item.text}
															</option>
														)
													)}
												</select>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
				{orderData && orderData.total > orderData.limit ? (
					<div className="flex justify-center py-5">
						<Pagination
							page={page}
							limit={orderData.limit ? orderData.limit : 0}
							total={orderData.total ? orderData.total : 0}
							setPage={(page) => setPage(page)}
						/>
					</div>
				) : null}
			</div>
			<ToasterContainer />
		</>
	);
}

export default Orders;
