import React, { useEffect, useState } from "react";
import EcomAPI from "../api/Ecomm.api";
import NavBar from "./partials/navBar";
import { MagnifyingGlass } from "phosphor-react";
import ProductCard from "../components/productCard";

function Index() {
    const [data, setData] = useState([]);

    const getUser = async () => {
        try {
            const response = await EcomAPI.get("/user");
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <NavBar />
            <div className="flex justify-around w-[1200px] mx-auto ">
                <div className="w-[300px] border-gray-900 rounded px-4 py-4 bg-base-100 h-fit">
                    <div className="form-control pb-4 flex content-center">
                        <div className="input-group flex justify-center">
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
                    <div>
                        <h2 className="text-xl font-bold">Category</h2>
                        <ul className="ml-4">
                            <li>Monitor(30)</li>
                            <li>Graphics Card(30)</li>
                            <li>CPU(20)</li>
                            <li>PSU(10)</li>
                            <li>Motherboard(10)</li>
                        </ul>
                    </div>
                </div>
                <div className="w-[850px] h-fit">
                    <div className="bg-base-100 p-4 rounded align-middle mb-4">
                        <div className="flex justify-between">
                            <h2 className="items-center flex text-xl">
                                Shoes (Page 4)
                            </h2>
                            <div className="items-center flex ">
                                <select
                                    className="select select-bordered select-md w-[250px] max-w-xs"
                                    name="sort"
                                >
                                    <option disabled selected>
                                        Sorted By
                                    </option>
                                    <option>Price: Low to Hight</option>
                                    <option>Price: High to Low</option>
                                    <option>Popularity</option>
                                </select>
                            </div>
                            <div className="btn-group">
                                <button className="btn">«</button>
                                <button className="btn">Page 22</button>
                                <button className="btn">»</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
