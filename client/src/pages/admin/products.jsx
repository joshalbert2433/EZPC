import React from "react";
import NavBar from "../partials/navBar";
import { Link } from "react-router-dom";
import Modal from "../../components/modal";
import { Edit, Menu, Trash2 } from "react-feather";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
                    <label htmlFor="my-modal" className="btn btn-primary">
                        Add new product
                    </label>
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

            <Modal title="Add New Product">
                <div>
                    <label htmlFor="name" className="label">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Type name here"
                        className="input input-bordered w-full "
                    />
                </div>
                <div>
                    <label htmlFor="description" className="label">
                        Description:
                    </label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Type description here"
                        name="description"
                    ></textarea>
                </div>
                <p className="label">Category:</p>

                <div className="h-[200px] w-full border-opacity-10 p-4 grid grid-cols-2 gap-2 overflow-y-auto [&>*]:h-fit">
                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>
                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>

                    <div className="form-control  bg-base-200 rounded-md px-2">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="checkbox" />
                            <span>Monitor</span>
                        </label>
                    </div>
                </div>
                <form action="/" method="POST" className="my-4">
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs hidden"
                    />
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Upload"
                    />
                </form>

                <div className="w-full bg-base-300 h-[300px]">
                    <ul className="p-3">
                        <li className="flex items-center justify-around bg-base-100 p-2">
                            <Menu />
                            <img
                                className="object-fit w-[80px] h-[60px]"
                                src="https://media.istockphoto.com/id/1190641416/photo/streaming-live-esport-event-on-computer-at-home.jpg?b=1&s=170667a&w=0&k=20&c=zsbJz2Ua_QZeMI0Zuw4OLegmdjIWwy8j5ZDczBjEVFw="
                                alt="pic"
                            />
                            <Trash2 />
                            <div className="form-control rounded-md py-1 px-3">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                    />
                                    <p className="ml-2">Main</p>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </Modal>
        </>
    );
}

export default AdminProducts;