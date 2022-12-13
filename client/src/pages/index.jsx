import React, { useEffect, useState } from "react";
import EcommAPI from "../api/Ecomm.api";
import NavBar from "./partials/navBar";
import { MagnifyingGlass } from "phosphor-react";
import ProductCard from "../components/productCard";
import { handler } from "daisyui";
import Pagination from "../components/pagination";

function Index() {
    const [productData, setProductData] = useState();

    const [sort, setSort] = useState({ sort: "rating", order: "desc" });
    const [filterCategory, setFilterCategory] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const getAllProducts = async () => {
        try {
            const url = `products?page=${page}&sort=${sort.sort},${
                sort.order
            }&genre=${filterCategory.toString()}&search=${search}&limit=20`;

            const response = await EcommAPI.get(url);
            // if (response.data.total )
            setProductData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
        // console.log(productData);
    }, []);

    useEffect(() => {
        getAllProducts();
        //eslint-disable-next-line
    }, [sort, filterCategory, page, search]);

    const handlerPageIncrement = (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(productData.total / productData.limit);
        console.log(page, productData.page + 1);
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlerPageDecrement = (e) => {
        e.preventDefault();
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handlerSearch = (e) => {
        const { value } = e.target;
        if (productData.total <= productData.limit) {
            setPage(1);
        }
        setSearch(value);
    };

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
                                onChange={handlerSearch}
                                value={search}
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
                                ALL (Page {page})
                            </h2>
                            <div className="items-center flex ">
                                <select
                                    className="select select-bordered select-md w-[250px] max-w-xs"
                                    name="sort"
                                >
                                    <option disabled>Sorted By</option>
                                    <option>Price: Low to Hight</option>
                                    <option>Price: High to Low</option>
                                    <option>Popularity</option>
                                </select>
                            </div>
                            <div className="btn-group">
                                <button
                                    className="btn"
                                    onClick={handlerPageDecrement}
                                >
                                    «
                                </button>
                                <button className="btn">Page {page}</button>
                                <button
                                    className="btn"
                                    onClick={handlerPageIncrement}
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        {productData
                            ? productData.data.map((data) => {
                                  return (
                                      <ProductCard data={data} key={data._id} />
                                  );
                              })
                            : null}
                    </div>

                    {productData && productData.total > productData.limit ? (
                        <div className="flex justify-center py-5">
                            <Pagination
                                page={page}
                                limit={
                                    productData.limit ? productData.limit : 0
                                }
                                total={
                                    productData.total ? productData.total : 0
                                }
                                setPage={(page) => setPage(page)}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Index;
