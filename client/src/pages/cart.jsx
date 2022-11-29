import React from "react";
import NavBar from "./partials/navBar";

function Cart() {
    return (
        <>
            <NavBar />
            <div className="xl:w-[1200px] mx-auto">
                <div className="overflow-x-auto p-2 md:p-0">
                    <div className="overflow-x-auto">
                        <table className="table w-full ">
                            <thead>
                                <tr className="text-gray-200 [&>*]:bg-neutral ">
                                    <th></th>
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
                <div className="w-[200px] mx-auto xl:mx-0 xl:ml-auto mt-4">
                    <p className="text-xl text-center text-secondary">
                        Total: &#36;200
                    </p>
                    <button className="btn btn-primary w-full mt-4">
                        Continue Shopping
                    </button>
                </div>
                <div className="xl:w-[40%] xl:mx-0 md:w-[70%] md:mx-auto p-4 md:p-0 mt-4">
                    <h2 className="text-2xl font-semibold">
                        Shipping Information
                    </h2>
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
                </div>
            </div>
        </>
    );
}

export default Cart;
