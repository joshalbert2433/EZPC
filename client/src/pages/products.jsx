import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/productCard";
import EcommAPI from "../api/Ecomm.api";
import { User } from "../services/reducers/userInfo";
import { Navigation, Thumbs } from "swiper";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../components/toaster";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardSkeleton from "../components/productCardSkeleton";

// IMPORT SWIPER AND MODULE STYLES
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet-async";

function Products() {
	const [activeThumb, setActiveThumb] = useState(null);
	const [productData, setProductData] = useState();
	const [similarProductData, setSimilarProductData] = useState();
	const { state: ctxState, dispatch: ctxDispatch } = useContext(User);
	const [quantity, setQuantity] = useState(1);
	const { userInfo } = ctxState;
	const [productLoad, setProductLoad] = useState(false);

	const navigate = useNavigate();

	// GET THE QUERY PARAMETERS
	const search = useLocation().search;
	const urlName = new URLSearchParams(search).get("name");
	const urlId = new URLSearchParams(search).get("id");
	const urlCategory = new URLSearchParams(search).get("category");

	const [id, setId] = useState();

	const getProductById = async (id) => {
		try {
			setProductLoad(true);
			const response = await EcommAPI.get(`products/${id}`);
			if (response) setProductLoad(false);
			setProductData(response.data);
		} catch (error) {
			console.log(error);

			navigate("/pageNotFound");
		}
	};

	const getProductByCategory = async (category) => {
		try {
			const response = await EcommAPI.get(
				`products?category=${category}&limit=10`
			);

			setSimilarProductData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProductById(urlId);
		getProductByCategory(urlCategory);

		setId(urlId);

		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		// getProductByCategory(productData.category);
	}, [similarProductData, id, quantity, activeThumb]);

	const addCartHandler = () => {
		if (!userInfo) return navigate("/login");
		ctxDispatch({
			type: "ADD_CART_ITEM",
			payload: { _id: productData._id, quantity: quantity },
		});
		toast.dismiss();
		toastSuccess("Item has been added to your shopping cart");
	};

	return (
		<>
			<Helmet>
				<title>{`EZPC | ${productData ? productData.name : ""}`}</title>
			</Helmet>
			<div className="w-[1200px] mx-auto">
				{productData && !productLoad ? (
					<div className="bg-base-100  flex">
						<div className="w-[40%] p-4">
							<Swiper
								loop={true}
								spaceBetween={10}
								navigation={productData.image.length > 1}
								modules={[Navigation, Thumbs]}
								grabCursor={true}
								thumbs={{
									swiper:
										activeThumb && !activeThumb.destroyed
											? activeThumb
											: null,
								}}
							>
								{productData.image.map((item, index) => (
									<SwiperSlide
										key={index}
										className="flex justify-center h-[400px]"
									>
										<img src={item} alt="product images" />
									</SwiperSlide>
								))}
							</Swiper>

							<Swiper
								onSwiper={setActiveThumb}
								// loop={true}
								spaceBetween={10}
								slidesPerView={
									productData.image.length <= 3
										? productData.image.length
										: 4
								}
								modules={[Navigation, Thumbs]}
								className="mt-4 "
							>
								{productData.image.length > 1 &&
									productData.image.map((item, index) => (
										<SwiperSlide key={index} className="">
											<div className="h-[100px]">
												<img
													src={item}
													alt="product images"
													className={
														productData.image
															.length > 1
															? "h-full w-[120px] mx-auto hover:border-2 hover:border-primary border-2"
															: "h-full w-full mx-auto hover:border-2 hover:border-primary border-2"
													}
												/>
											</div>
										</SwiperSlide>
									))}
							</Swiper>
						</div>
						<div className="w-[60%] p-4 space-y-3 pb-6">
							<h1 className="text-xl font-semibold h-14">
								{productData.name}
							</h1>
							<div className="flex items-center gap-2">
								<p className="text-xl text-secondary underline">
									5
								</p>
								<div className="rating rating-sm">
									<input
										type="radio"
										name="rating-2"
										className="mask mask-star-2 bg-orange-400"
										disabled
									/>
									<input
										type="radio"
										name="rating-2"
										className="mask mask-star-2 bg-orange-400"
										disabled
									/>
									<input
										type="radio"
										name="rating-2"
										className="mask mask-star-2 bg-orange-400"
										disabled
									/>
									<input
										type="radio"
										name="rating-2"
										className="mask mask-star-2 bg-orange-400"
										disabled
									/>
									<input
										type="radio"
										name="rating-2"
										className="mask mask-star-2 bg-orange-400"
										disabled
									/>
								</div>
							</div>
							<h2 className="text-3xl text-secondary font-semibold">
								&#36; {productData.price}
							</h2>
							<div>
								<h2 className="text-lg font-semibold p-4 bg-base-200 mb-4">
									Product Description
								</h2>
								<p className="p-2 h-[300px] whitespace-pre-line overflow-auto">
									{productData.description}
								</p>
							</div>
							<div className="flex gap-3">
								<button
									className="btn btn-primary"
									onClick={addCartHandler}
								>
									Add to cart
								</button>

								<select
									className="select select-bordered w-[180px] text-center select-xl"
									value={quantity}
									onChange={(e) =>
										setQuantity(e.target.value)
									}
								>
									<option value={1} defaultValue>
										1
									</option>
									<option value={2}>2</option>
									<option value={3}>3</option>
									<option value={4}>4</option>
									<option value={5}>5</option>
								</select>
								<p className="flex items-center text-gray-500">
									{productData.stock} pieces available
								</p>
							</div>
						</div>
					</div>
				) : (
					// <p>Loading...</p>
					<div className="h-[632px]">Loading...</div>
				)}

				{productData ? (
					<div className="mt-5">
						<p className="text-xl font-semibold mb-3">Similar</p>
						<div className=" flex gap-y-4 flex-wrap justify-between">
							{similarProductData
								? similarProductData.data
										.slice(0, 7)
										.map((data) => {
											return (
												<ProductCard
													key={data._id}
													data={data}
													onClick={() => {
														setActiveThumb(null);
														getProductById(
															data._id
														);
													}}
												/>
											);
										})
								: [...Array(7)].map((item, index) => {
										return (
											<ProductCardSkeleton key={index} />
										);
								  })}
						</div>
					</div>
				) : null}
			</div>

			<ToastContainer />
		</>
	);
}

export default Products;
