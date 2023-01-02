import React from "react";

function OrderShow() {
	return (
		<>
			<div className="w-[1200px] mx-auto flex gap-12">
				<div className="w-[30%] bg-base-100 py-8 px-12 rounded-lg shadow-lg">
					<h2 className="font-bold">Order ID: 1</h2>
					<div className="mt-4">
						<p className="font-semibold underline">
							Customer shipping info:
						</p>
						<p>Name: Bob</p>
						<p>Address: 123 dojo</p>
						<p>City: Imus</p>
						<p>State: Cavite</p>
						<p>Zip Code: 4103</p>
					</div>
					<div className="mt-4">
						<p className="font-semibold underline">
							Customer billing info:
						</p>
						<p>Name: Bob</p>
						<p>Address: 123 dojo</p>
						<p>City: Imus</p>
						<p>State: Cavite</p>
						<p>Zip Code: 4103</p>
					</div>
				</div>
				<div className="w-[70%]">
					<div className="overflow-x-auto p-2 md:p-0 shadow-lg">
						<div className="overflow-x-auto ">
							<table className="table w-full">
								<thead>
									<tr className="text-gray-200 [&>*]:bg-neutral ">
										<th>ID</th>
										<th>Item</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>1</th>
										<td>Cy Ganderton</td>
										<td>Quality Control Specialist</td>
										<td>Blue</td>
										<td>Blue</td>
									</tr>

									<tr>
										<th>2</th>
										<td>Hart Hagerty</td>
										<td>Desktop Support Technician</td>
										<td>Desktop Support Technician</td>
										<td>Purple</td>
									</tr>

									<tr>
										<th>3</th>
										<td>Brice Swyre</td>
										<td>Tax Accountant</td>
										<td>Tax Accountant</td>
										<td>Red</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="flex py-8 justify-between ">
						<div className="bg-base-100 py-4 px-8 rounded-lg shadow-lg shadow-lg">
							<p>Sub total: &#36;29 </p>
							<p>Shipping fee: &#36;1 </p>
							<p>Total price: &#36;30</p>
						</div>
						<p className="bg-success h-fit py-4 px-8 rounded-lg text-black shadow-lg">
							Status: shipped
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default OrderShow;
