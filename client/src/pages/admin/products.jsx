import React, { useReducer, useState, useEffect } from "react";
import NavBar from "../partials/navBar";
import Modal from "../../components/modal";
import { Menu, Trash2, XCircle } from "react-feather";
import EcomAPI from "../../api/Ecomm.api";

import {
    addProductsFormReducer,
    INITIAL_STATE,
} from "../../reducer/productsFormReducer";

const categories = [
    "Processor",
    "Graphics Card",
    "Motherboard",
    "Monitor",
    "Memory",
    "Storage",
    "Power Supply",
];

function AdminProducts() {
    const [state, dispatch] = useReducer(addProductsFormReducer, INITIAL_STATE);

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: name, value: value },
        });
    };

    const handlerCategory = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            dispatch({
                type: "ADD_CATEGORY",
                payload: value,
            });
        } else {
            dispatch({
                type: "REMOVE_CATEGORY",
                payload: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await EcomAPI.post("products/register", {
                name: state.name,
                description: state.description,
                category: state.category,
            });
        } catch (error) {
            console.error(error);
        }
        console.log("hello");
    };

    useEffect(() => {
        console.log(state);
    }, [state]);

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
                    <label
                        htmlFor="AddProductModal"
                        className="btn btn-primary"
                    >
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
                                    <td>
                                        <img
                                            className="object-fit w-[80px] h-[60px]"
                                            src="https://media.istockphoto.com/id/1190641416/photo/streaming-live-esport-event-on-computer-at-home.jpg?b=1&s=170667a&w=0&k=20&c=zsbJz2Ua_QZeMI0Zuw4OLegmdjIWwy8j5ZDczBjEVFw="
                                            alt="pic"
                                        />
                                    </td>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                    <td>Blue</td>
                                    <td>
                                        <div className="flex gap-4">
                                            <label
                                                htmlFor="EditProductModal"
                                                className="link link-info"
                                            >
                                                Edit
                                            </label>
                                            <label
                                                htmlFor="DeleteProductModal"
                                                className="link link-error"
                                            >
                                                Delete
                                            </label>
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

            <Modal title="Add New Product" id="AddProductModal">
                <form onSubmit={handleSubmit} className="p4">
                    <div>
                        <label htmlFor="name" className="label">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Type name here"
                            className="input input-bordered w-full"
                            onChange={handleOnChange}
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
                            onChange={handleOnChange}
                        ></textarea>
                    </div>
                    <p className="label">Category:</p>

                    <div className="h-[200px] w-full border-opacity-10 p-4 grid grid-cols-2 gap-2 overflow-y-auto [&>*]:h-fit">
                        {categories.map((category, index) => {
                            return (
                                <div
                                    className="form-control  bg-base-200 rounded-md px-2"
                                    key={index}
                                >
                                    <label className="label cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            name="category"
                                            value={category}
                                            onChange={handlerCategory}
                                        />
                                        <span>{category}</span>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <div className="my-4">
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs hidden"
                        />
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Upload"
                        />
                    </div>

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
                    <div className="modal-action">
                        <label htmlFor="AddProductModal" className="btn">
                            Cancel
                        </label>
                        <button type="submit" className="btn btn-primary">
                            add
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal title="Edit Product" id="EditProductModal">
                <div className="p4">
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
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    name="category"
                                    value="processor"
                                />
                                <span>Processor</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    name="category"
                                    value="graphics card"
                                />
                                <span>Graphics Card</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox" />
                                <span>Motherboard</span>
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
                                <span>Memory</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox" />
                                <span>Storage</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox" />
                                <span>Power Supply</span>
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
                </div>
                <div className="modal-action">
                    <label htmlFor="EditProductModal" className="btn">
                        Cancel
                    </label>
                    <button className="btn btn-secondary">Preview</button>
                    <button className="btn btn-primary">Update</button>
                </div>
            </Modal>

            <Modal id="DeleteProductModal">
                <div className="">
                    <div className="w-fit mx-auto flex flex-col justify-center items-center text-center space-y-4">
                        <XCircle color="red" size={60} />
                        <p className="text-3xl">Are You Sure?</p>
                        <p className="text-xl text-gray-500">
                            Do you really want to delete this records? This
                            process cannot be undone
                        </p>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="DeleteProductModal" className="btn">
                            Cancel
                        </label>
                        <button className="btn btn-error">Delete</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default AdminProducts;
