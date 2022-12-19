import React from "react";

function Cart() {
    return (
        <>
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
                <div className="flex justify-between">
                    <div className="xl:w-[40%] xl:mx-0 md:w-[70%] md:mx-auto mt-4 bg-base-100 p-4 rounded-md">
                        <h2 className="text-2xl font-semibold">
                            Billing Information
                        </h2>
                        <div className="form-control rounded-md py-1 px-3 w-fit">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox" />
                                <p className="ml-2">Same as shipping address</p>
                            </label>
                        </div>
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
                    <div className="xl:w-[40%] xl:mx-0 md:w-[70%] md:mx-auto mt-4 bg-base-100 p-4 rounded-md h-fit">
                        <div className="form-control w-full">
                            <label className="label">Card: </label>
                            <input
                                type="text"
                                placeholder="Josh"
                                className="input input-sm md:input-md input-bordered w-full "
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Security Code: </label>
                            <input
                                type="text"
                                placeholder="Josh"
                                className="input input-sm md:input-md input-bordered w-full "
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">Expiration: </label>
                            <div className="flex place-items-center">
                                <input
                                    type="text"
                                    placeholder="mm"
                                    className="input input-sm md:input-md input-bordered w-full "
                                />
                                <p className="mx-4">/</p>
                                <input
                                    type="text"
                                    placeholder="year"
                                    className="input input-sm md:input-md input-bordered w-full "
                                />
                            </div>
                        </div>
                        <button className="btn btn-secondary mt-4">Pay</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
