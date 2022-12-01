import React from "react";
import NavBar from "./partials/navBar";
import { Plus, XCircle } from "react-feather";
import Modal from "../components/modal";
import { Link } from "react-router-dom";

function Address() {
    return (
        <>
            <NavBar />
            <div className="w-[1200px] mx-auto ">
                <div className="flex justify-between p-4 items-center bg-base-100 rounded-lg">
                    <h1 className="text-xl font-semibold">My Addresses</h1>
                    <label
                        htmlFor="AddAddressModal"
                        className="btn btn-primary"
                    >
                        <Plus /> Add New Address
                    </label>
                </div>
                <div className="overflow-x-auto p-2 md:p-0 my-4">
                    <div className="overflow-x-auto">
                        <table className="table w-full ">
                            <thead>
                                <tr className="text-gray-200 [&>*]:bg-neutral ">
                                    <th>Full Name</th>
                                    <th>Complete Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Michael Jordan</td>
                                    <td>
                                        143 Delicades Street Tondo, Manila, 4104
                                    </td>
                                    <td>
                                        <div className="flex gap-4">
                                            <label
                                                htmlFor="EditAddressModal"
                                                className="link link-info"
                                            >
                                                Edit
                                            </label>
                                            <label
                                                htmlFor="DeleteAddressModal"
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
            </div>

            <Modal title="Add New Address" id="AddAddressModal">
                <div className="form-control w-full">
                    <label className="label">First Name</label>
                    <input
                        type="text"
                        placeholder="Josh"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">Last Name</label>
                    <input
                        type="text"
                        placeholder="Alberts"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">Address</label>
                    <input
                        type="text"
                        placeholder="Malayo, Malapit, Di makita Street"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">City</label>
                    <input
                        type="text"
                        placeholder="Imus"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">State</label>
                    <input
                        type="text"
                        placeholder="Cavite"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">Zip Code</label>
                    <input
                        type="text"
                        placeholder="4103"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="modal-action">
                    <label htmlFor="AddAddressModal" className="btn">
                        Cancel
                    </label>
                    <button className="btn btn-primary">Add</button>
                </div>
            </Modal>

            <Modal title="Edit Address" id="EditAddressModal">
                <div className="form-control w-full">
                    <label className="label">First Name</label>
                    <input
                        type="text"
                        placeholder="Josh"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">Last Name</label>
                    <input
                        type="text"
                        placeholder="Alberts"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">Address</label>
                    <input
                        type="text"
                        placeholder="Malayo, Malapit, Di makita Street"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">City</label>
                    <input
                        type="text"
                        placeholder="Imus"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">State</label>
                    <input
                        type="text"
                        placeholder="Cavite"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">Zip Code</label>
                    <input
                        type="text"
                        placeholder="4103"
                        className="input input-sm md:input-md input-bordered w-full "
                    />
                </div>
                <div className="modal-action">
                    <label htmlFor="EditAddressModal" className="btn">
                        Cancel
                    </label>
                    <button className="btn btn-primary">Edit</button>
                </div>
            </Modal>

            <Modal id="DeleteAddressModal">
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
                        <label htmlFor="DeleteAddressModal" className="btn">
                            Cancel
                        </label>
                        <button className="btn btn-error">Delete</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Address;
