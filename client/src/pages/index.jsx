import React, { useEffect, useState } from "react";
import EcommAPI from "../api/Ecomm.api";
import ProductCard from "../components/productCard";
import Pagination from "../components/pagination";
import useDebounce from "../hooks/useDebounce";
import ProductCardSkeleton from "../components/productCardSkeleton";
import { Helmet } from "react-helmet-async";

const categoryOptions = [
	"Processor",
	"Graphics Card",
	"Motherboard",
	"Monitor",
	"Memory",
	"Storage",
	"Power Supply",
];

function Index() {
	const [productData, setProductData] = useState();
	const [sort, setSort] = useState("");
	const [filterCategory, setFilterCategory] = useState([]);
	const [page, setPage] = useState(1);
	const [limit] = useState(20);
	const [search, setSearch] = useState("");
	const [productLoad, setProductLoad] = useState(false);
	const debouncedSearch = useDebounce(search, 200);

	const getAllProducts = async () => {
		try {
			setProductLoad(true);
			const url = `products?page=${page}&sort=${sort}&category=${filterCategory.toString()}&search=${debouncedSearch}&limit=${limit}`;
			const response = await EcommAPI.get(url);
			if (response) setProductLoad(false);
			setProductData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllProducts();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		getAllProducts();

		//eslint-disable-next-line
	}, [sort, filterCategory, page, debouncedSearch, filterCategory]);

	const handlerPageIncrement = (e) => {
		e.preventDefault();
		const totalPages = Math.ceil(productData.total / productData.limit);

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

	const handlerCategory = (e) => {
		const { checked, value } = e.target;
		if (productData.total <= productData.limit) setPage(1);

		if (checked) {
			setFilterCategory((prevState) => [...prevState, value]);
		} else {
			setFilterCategory((prevState) => [
				...prevState.filter((val) => val !== value),
			]);
		}
	};

	return (
		<>
			<Helmet>
				<title>EZPC | Products</title>
			</Helmet>
			<div className="flex justify-around w-[1200px] mx-auto ">
				<div className="w-[300px] border-gray-900 rounded px-4 py-4 bg-base-100 h-fit shadow-lg">
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
						<ul className="ml-4 space-y-4 mt-4">
							{categoryOptions.map((category, index) => {
								return (
									<li key={index}>
										<div className="form-control">
											<label className="label cursor-pointer justify-start gap-4">
												<input
													type="checkbox"
													className="checkbox"
													value={category}
													onClick={handlerCategory}
												/>
												<span className="text-base">
													{category}
												</span>
											</label>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="w-[850px] h-fit">
					<div className="bg-base-100 p-4 rounded align-middle mb-4 shadow-lg">
						<div className="flex justify-between">
							<div className="items-center flex ">
								<select
									className="select select-bordered select-md w-[250px] max-w-xs"
									name="sort"
									onChange={(e) => setSort(e.target.value)}
								>
									<option disabled>Sorted By</option>
									<option value="lowest" defaultValue>
										Price: Low to High
									</option>
									<option value="highest">
										Price: High to Low
									</option>
									<option value="oldest">
										Date: Oldest to Newest
									</option>
									<option value="newest">
										Date: Newest to Oldest
									</option>
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

					{/* DISPLAY PRODUCTS */}
					<div className="flex gap-3 flex-wrap">
						{productData && !productLoad
							? productData.data.map((data) => {
									return (
										<ProductCard
											data={data}
											key={data._id}
										/>
									);
							  })
							: [...Array(limit)].map((item, index) => (
									<ProductCardSkeleton key={index} />
							  ))}
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
