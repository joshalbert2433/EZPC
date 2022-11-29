import React from "react";
import NavBar from "../partials/navBar";
import { Link } from "react-router-dom";

function AdminProducts() {
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
                    <button className="btn btn-primary">Add new product</button>
                </div>
                <div className="overflow-x-auto p-2 md:p-0 my-4">
                    <div className="overflow-x-auto">
                        <table className="table w-full ">
                            <thead>
                                <tr className="text-gray-200 [&>*]:bg-neutral ">
                                    <th>Picture</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Inventory Count</th>
                                    <th>Quantity Sold</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        <img
                                            className="object-fit w-[80px] h-[60px]"
                                            src="https://media.istockphoto.com/id/1190641416/photo/streaming-live-esport-event-on-computer-at-home.jpg?b=1&s=170667a&w=0&k=20&c=zsbJz2Ua_QZeMI0Zuw4OLegmdjIWwy8j5ZDczBjEVFw="
                                            alt="pic"
                                        />
                                    </th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td>Blue</td>
                                    <td>
                                        <div className="flex gap-4">
                                            <Link
                                                to={{ pathname: "/" }}
                                                className="link link-info inline-block"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                to={{ pathname: "/" }}
                                                className="link link-error inline-block"
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        <img
                                            className="object-fit w-[80px] h-[60px]"
                                            src="https://media.istockphoto.com/id/1190641416/photo/streaming-live-esport-event-on-computer-at-home.jpg?b=1&s=170667a&w=0&k=20&c=zsbJz2Ua_QZeMI0Zuw4OLegmdjIWwy8j5ZDczBjEVFw="
                                            alt="pic"
                                        />
                                    </th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td>Blue</td>
                                    <td>
                                        <div className="flex gap-4">
                                            <Link
                                                to={{ pathname: "/" }}
                                                className="link link-info inline-block"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                to={{ pathname: "/" }}
                                                className="link link-error inline-block"
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        <img
                                            className="object-fit w-[80px] h-[60px]"
                                            src="https://media.istockphoto.com/id/1190641416/photo/streaming-live-esport-event-on-computer-at-home.jpg?b=1&s=170667a&w=0&k=20&c=zsbJz2Ua_QZeMI0Zuw4OLegmdjIWwy8j5ZDczBjEVFw="
                                            alt="pic"
                                        />
                                    </th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td>Blue</td>
                                    <td>
                                        <div className="flex gap-4">
                                            <Link
                                                to={{ pathname: "/" }}
                                                className="link link-info inline-block"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                to={{ pathname: "/" }}
                                                className="link link-error inline-block"
                                            >
                                                Delete
                                            </Link>
                                        </div>
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

export default AdminProducts;
