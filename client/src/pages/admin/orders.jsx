import React from "react";
import NavBar from "../partials/navBar";

function Orders() {
    return (
        <>
            <NavBar />
            <div className="w-[1200px] mx-auto">
                <div className="flex justify-between">
                    <div className="form-control">
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
                    </div>
                    <select className="select select-bordered w-full max-w-xs">
                        <option selected>Show All</option>
                        <option>Order In Process</option>
                        <option>Shipped</option>
                        <option>Cancelled</option>
                    </select>
                </div>
                <div className="overflow-x-auto p-2 md:p-0 my-4">
                    <div className="overflow-x-auto">
                        <table className="table w-full ">
                            <thead>
                                <tr className="text-gray-200 [&>*]:bg-neutral ">
                                    <th>Order ID</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Billing Address</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td>Blue</td>
                                    <td>
                                        <select className="select select-sm select-bordered">
                                            <option selected>
                                                Order In Process
                                            </option>
                                            <option>Shipped</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Malayo Malipit Di makita Streeet</td>
                                    <td>Blue</td>
                                    <td>
                                        <select className="select select-sm select-bordered">
                                            <option selected>
                                                Order In Process
                                            </option>
                                            <option>Shipped</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Voluptate minima
                                        beatae quos autem, ullam aut blanditiis
                                        ipsam impedit pariatur eaque.
                                    </td>
                                    <td>Blue</td>
                                    <td>
                                        <select className="select select-sm select-bordered">
                                            <option selected>
                                                Order In Process
                                            </option>
                                            <option>Shipped</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center py-5">
                    <div className="btn-group">
                        <button className="btn">1</button>
                        <button className="btn btn-active">2</button>
                        <button className="btn">3</button>
                        <button className="btn">4</button>
                        <button className="btn">5</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Orders;
