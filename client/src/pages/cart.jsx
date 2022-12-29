import { Minus, Plus } from "phosphor-react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import EcommAPI from "../api/Ecomm.api";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "../reducer/userInfo";

function Cart() {
    // const [cartItems, setCartItems] = useLocalStorage()
    const { state, dispatch: ctxDispatch } = useContext(User);
    const [cartData, setCartData] = useState();
    const { userInfo, cart } = state;
    let total = 0;

    const getProductManyById = async () => {
        try {
            const itemIds = cart.cartItems.map((item) => item._id);
            console.log(itemIds);
            const response = await EcommAPI.get(
                `products/getManyById?itemIds=${itemIds.toString()}`
            );
            setCartData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(cart);
        getProductManyById();
        // console.log(userInfo);

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        getProductManyById();
    }, [cart]);

    return (
        <>
            <div className="xl:w-[1200px] mx-auto">
                <div className="flex flex-col max-w-full p-6 space-y-4 sm:p-10 bg-base-100">
                    <h2 className="text-xl font-semibold">
                        Your Shopping Cart
                    </h2>
                    <ul className="flex flex-col divide-y divide-gray-700">
                        {cartData
                            ? cartData.data.map((data, index) => {
                                  let item = cart?.cartItems.find(
                                      (item) => item._id === data._id
                                  );
                                  let subtotal = item?.quantity * data.price;
                                  total += subtotal;

                                  return (
                                      <li
                                          className="flex flex-col py-6 sm:flex-row sm:justify-between"
                                          key={data._id}
                                      >
                                          <div className="flex w-full space-x-2 sm:space-x-4">
                                              <img
                                                  className="flex-shrink-0 border object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                                                  src={
                                                      data.image[
                                                          data.image_main
                                                      ]
                                                  }
                                                  alt="Polaroid camera"
                                              />
                                              <div className="flex flex-col justify-between w-full pb-4">
                                                  <div className="flex justify-between w-full pb-2 space-x-2">
                                                      <div className="space-y-1">
                                                          <h3 className="text-lg font-semibold leading-snug sm:pr-8 line-clamp-2">
                                                              X {data.name}
                                                          </h3>
                                                      </div>
                                                      <div className="text-right">
                                                          <p className="text-lg font-semibold text-secondary">
                                                              {data.price}
                                                              &#36;
                                                          </p>
                                                      </div>
                                                  </div>
                                                  <div className="flex text-sm gap-5">
                                                      <div className="btn-group">
                                                          <button className="btn-square border border-neutral border-r-0 btn-sm flex justify-center items-center">
                                                              <Minus />
                                                          </button>
                                                          <p className="border border-neutral w-10 flex justify-center items-center text-base">
                                                              {cart.cartItems.map(
                                                                  (item) =>
                                                                      item._id ===
                                                                      data._id
                                                                          ? item.quantity
                                                                          : null
                                                              )}
                                                          </p>
                                                          <button className="btn-square border border-neutral border-l-0 btn-sm flex justify-center items-center">
                                                              <Plus />
                                                          </button>
                                                      </div>
                                                      <button
                                                          type="button"
                                                          className="flex items-center px-2 py-1 pl-0 space-x-1"
                                                          onClick={(e) => {
                                                              e.preventDefault();
                                                              ctxDispatch({
                                                                  type: "CART_REMOVE_ITEM",
                                                                  payload: {
                                                                      _id: data._id,
                                                                  },
                                                              });
                                                          }}
                                                      >
                                                          <svg
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              viewBox="0 0 512 512"
                                                              className="w-4 h-4 fill-current"
                                                          >
                                                              <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                              <rect
                                                                  width="32"
                                                                  height="200"
                                                                  x="168"
                                                                  y="216"
                                                              ></rect>
                                                              <rect
                                                                  width="32"
                                                                  height="200"
                                                                  x="240"
                                                                  y="216"
                                                              ></rect>
                                                              <rect
                                                                  width="32"
                                                                  height="200"
                                                                  x="312"
                                                                  y="216"
                                                              ></rect>
                                                              <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                                          </svg>

                                                          <span>Remove</span>
                                                      </button>
                                                  </div>
                                              </div>
                                          </div>
                                      </li>
                                  );
                              })
                            : null}
                    </ul>
                    <div className="space-y-1 text-right">
                        <p>
                            Total amount:{" "}
                            <span className="font-semibold text-secondary text-xl">
                                {total} &#36;
                            </span>
                        </p>
                        <p className="text-sm dark:text-gray-400">
                            Not including taxes and shipping costs
                        </p>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-6 py-2 border rounded-md btn"
                        >
                            Back{" "}
                            <span className="sr-only sm:not-sr-only">
                                to shop
                            </span>
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 border rounded-md btn-primary"
                        >
                            <span className="sr-only sm:not-sr-only">
                                Continue to{" "}
                            </span>
                            Checkout
                        </button>
                    </div>
                </div>

                {/* <div className="w-[200px] mx-auto xl:mx-0 xl:ml-auto mt-4">
                    <p className="text-xl text-center text-secondary">
                        Total: &#36;{total}
                    </p>
                    <button className="btn btn-primary w-full mt-4">
                        Checkout
                    </button>
                </div> */}
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
