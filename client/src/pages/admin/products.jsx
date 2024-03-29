import React, { useReducer, useState, useEffect, useRef } from "react";
import Modal from "../../components/modal";
import EcommAPI from "../../api/Ecomm.api";
import { Menu, Trash2, XCircle } from "react-feather";
import ImageUploading from "react-images-uploading";
import Skeleton from "../../components/skeleton";
import {
	ToasterContainer,
	toastInfo,
	toastError,
	toastSuccess,
} from "../../components/toaster";
import "react-toastify/dist/ReactToastify.css";

import {
	addProductsFormReducer,
	INITIAL_STATE,
} from "../../services/reducers/productsFormReducer";

import Pagination from "../../components/pagination";
import { toast } from "react-toastify";
import { useContext } from "react";
import { User } from "../../services/reducers/userInfo";
import { getError } from "../../services/utils/getError";
import { Helmet } from "react-helmet-async";

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
	const [productData, setProductData] = useState();
	const [editProductData, setEditProductData] = useState();
	const { state: ctxState, dispach: ctxDispach } = useContext(User);
	const { userInfo } = ctxState;
	const addProductForm = useRef();
	const editProductForm = useRef();
	const addProductButton = useRef();
	const modalDiscardClose = useRef();
	const maxNumber = 4;

	const [sort, setSort] = useState({ sort: "rating", order: "desc" });
	const [filterCategory, setFilterCategory] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const getAllProducts = async () => {
		try {
			const url = `products?page=${page}&sort=${sort.sort},${
				sort.order
			}&genre=${filterCategory.toString()}&search=${search}`;

			const response = await EcommAPI.get(url);

			setProductData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProductById = async (id) => {
		try {
			const response = await EcommAPI.get(`products/${id}`);
			setEditProductData(response.data);

			dispatch({ type: "ASSIGN_DATA", payload: { data: response.data } });
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProductByID = async (id) => {
		try {
			await EcommAPI.delete(`products/delete/${id}`, {
				headers: { Authorization: `Bearer ${userInfo.token}` },
			});

			toastSuccess("Product Successfully Deleted");
			getAllProducts();
		} catch (error) {
			toastError(getError(error));
			console.log(error);
		}
	};

	useEffect(() => {
		getAllProducts();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getAllProducts();

		// eslint-disable-next-line
	}, [sort, filterCategory, page, search]);

	const handlerSearch = (e) => {
		const { value } = e.target;

		//  ! INCASE OF PAGINATION MALFUNCTION THIS IS THE CULPRIT
		if (productData.total <= productData.limit) {
			setPage(1);
		}
		setSearch(value);
	};

	const handleOnChange = (e) => {
		const { value, name } = e.target;

		// * FOR PRICE AND STOCK ACCEPT NUMBER VALUE ONLY
		if (name === "price" || name === "stock") {
			const numberOnly = e.target.value.replace(/\D/g, "");
			dispatch({
				type: "CHANGE_INPUT",
				payload: { name: name, value: numberOnly },
			});
		} else {
			dispatch({
				type: "CHANGE_INPUT",
				payload: { name: name, value: value },
			});
		}
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

	const handlerImage = (imageList, addUpdateIndex) => {
		// DATA FOR SUBMIT
		console.log(imageList, addUpdateIndex);
		imageList = imageList.map((image) => image.data_url ?? image);

		dispatch({
			type: "IMAGE_INPUT",
			payload: imageList,
		});
	};

	const handlerImageMain = (event, index) => {
		console.log(index);

		const { checked } = event.target;

		if (checked) {
			dispatch({
				type: "SET_IMAGE_MAIN",
				payload: index,
			});
		} else {
			dispatch({
				type: "SET_IMAGE_MAIN",
				payload: "",
			});
		}
	};

	const handlerReset = () => {
		if (addProductForm.current) addProductForm.current.reset();
		if (editProductForm.current) editProductForm.current.reset();

		dispatch({
			type: "RESET",
		});
	};

	const formValidation = () => {
		toast.dismiss();
		let form_errors = [];

		if (state.name.length === 0) {
			form_errors.push("Name Is required");
		}
		if (state.description.length === 0) {
			form_errors.push("Description Is required");
		}
		if (state.category.length === 0) {
			form_errors.push("Must select category");
		}
		if (state.price.length === 0) {
			form_errors.push("Price is required");
		}
		if (state.stock.length === 0) {
			form_errors.push("Stock is required");
		}
		if (state.image.length === 0) {
			form_errors.push("Must select at least one image");
		} else if (state.image.length !== 0 && state.image_main.length === 0) {
			form_errors.push("Must select main image for product");
		}

		if (form_errors.length > 0) {
			form_errors.map((error) => {
				toastError(error);
				return false;
			});
			return true;
		}
	};

	const handlerAddProduct = async (e) => {
		e.preventDefault();

		const isValidated = formValidation();

		if (isValidated) return;

		try {
			addProductButton.current.setAttribute("disabled", "disabled");
			await EcommAPI.post(
				"products/register",
				{
					name: state.name,
					description: state.description,
					image: state.image,
					category: state.category,
					image_main: state.image_main,
					stock: state.stock,
					price: state.price,
				},
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);

			toastSuccess("Product Successfully Added");
			addProductButton.current.removeAttribute("disabled");
			getAllProducts();
			handlerReset();
		} catch (error) {
			toastError(getError(error));
			console.log(error);
		}
	};

	const handlerEditProduct = async (e) => {
		e.preventDefault();
		console.log("update");
		const isValidated = formValidation();

		if (isValidated) return;

		try {
			await EcommAPI.patch(
				`products/${state._id}`,
				{
					name: state.name,
					description: state.description,
					image: state.image,
					category: state.category,
					image_main: state.image_main,
					stock: state.stock,
					price: state.price,
				},
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);

			toastSuccess("Product Successfully Updated");
			getProductById(state._id);
			getAllProducts();
		} catch (error) {
			toastError(getError(error));
			console.log(error);
		}
	};

	const handlerImageError = (error) => {
		toastError(`Image upload limit is ${maxNumber}`);
	};

	return (
		<>
			<Helmet>
				<title>EZPC | Admin</title>
			</Helmet>
			<div className="w-[1200px] mx-auto">
				<div className="flex justify-between">
					<div className="form-control">
						<div className="input-group">
							<input
								type="text"
								placeholder="Search By Name Here…"
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
					<label
						htmlFor="AddProductModal"
						className="btn btn-primary"
						onClick={handlerReset}
					>
						Add new product
					</label>
				</div>
				{productData ? (
					<div className="overflow-x-auto p-2 md:p-0 my-4">
						<div className="overflow-x-auto">
							<table className="table table-fixed w-full ">
								<thead className="w-[100px] overflow-x-hidden">
									<tr className="text-gray-200 [&>*]:bg-neutral ">
										<th className="w-[120px]">Picture</th>
										<th className=" max-w-[30%]">Name</th>
										<th className=" w-[30%]">
											Description
										</th>

										<th className="w-[10%]">
											Inventory Count
										</th>

										<th className="w-[10%]">Action</th>
									</tr>
								</thead>
								<tbody>
									{productData.data.map((data) => {
										return (
											<tr key={data._id}>
												<td>
													<img
														className="object-fill w-[80px] h-[60px]"
														src={
															data.image[
																data.image_main
															]
														}
														alt="pic"
													/>
												</td>

												<td className="truncate">
													{data.name}
												</td>
												<td className="truncate">
													{data.description}
												</td>
												<td>{data.stock}</td>

												<td>
													<div className="flex gap-4">
														<label
															htmlFor="EditProductModal"
															className="link link-info"
															onClick={() => {
																// editProductForm.current.reset();

																getProductById(
																	data._id
																);
															}}
														>
															Edit
														</label>
														<label
															htmlFor="DeleteProductModal"
															className="link link-error"
															onClick={() => {
																getProductById(
																	data._id
																);
															}}
														>
															Delete
														</label>
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<Skeleton />
				)}

				{productData ? (
					<div className="flex justify-center py-5">
						<Pagination
							page={page}
							limit={productData.limit ? productData.limit : 0}
							total={productData.total ? productData.total : 0}
							setPage={(page) => setPage(page)}
						/>
					</div>
				) : null}
			</div>

			{/* ADD PRODUCT MODAL */}
			<Modal
				title="Add New Product"
				id="AddProductModal"
				handleModalOnClick={handlerReset}
			>
				<form
					onSubmit={handlerAddProduct}
					className="p4"
					ref={addProductForm}
				>
					<div>
						<label htmlFor="name" className="label">
							Name:
						</label>
						<input
							type="text"
							name="name"
							value={state.name}
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
							value={state.description}
							onChange={handleOnChange}
						></textarea>
					</div>

					<div className="flex gap-4">
						<div>
							<p className="label">Price:</p>
							<input
								type="text"
								name="price"
								className="input input-bordered w-full"
								onChange={handleOnChange}
								value={state.price}

								// pattern="^-?[0-9]\d*\.?\d*$"
							/>
						</div>
						<div>
							<p className="label">Stocks:</p>
							<input
								type="text"
								name="stock"
								className="input input-bordered w-full"
								onChange={handleOnChange}
								value={state.stock}
							/>
						</div>
					</div>

					<div>
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
												// REMOVE DISABLED FOR MULTIPLE CATEGORY
												disabled={
													state.category[0] !==
														category &&
													state.category.length !== 0
														? true
														: false
												}
												onClick={handlerCategory}
											/>
											<span>{category}</span>
										</label>
									</div>
								);
							})}
						</div>
					</div>

					<ImageUploading
						multiple
						value={state.image}
						onChange={handlerImage}
						maxNumber={maxNumber}
						dataURLKey="data_url"
						onError={handlerImageError}
					>
						{({
							imageList,
							onImageUpload,
							onImageRemoveAll,
							onImageUpdate,
							onImageRemove,
							isDragging,
							dragProps,
						}) => (
							// BUILDING UI
							<div className="my-4">
								<button
									type="button"
									style={
										isDragging
											? { color: "red" }
											: undefined
									}
									className="btn btn-primary mr-4"
									onClick={onImageUpload}
									{...dragProps}
								>
									Upload Image
								</button>

								{/* <button
                                    type="button"
                                    onClick={onImageRemoveAll}
                                    className="btn"
                                >
                                    Remove all images
                                </button> */}
								<div className="w-full bg-base-300 h-[300px] overflow-y-auto mt-4">
									<ul className="p-3 space-y-2">
										{imageList.map((image, index) => {
											return (
												<li
													className="flex items-center justify-around bg-base-100 p-2"
													key={index}
												>
													<Menu />
													<img
														className="object-fit w-[80px] h-[60px]"
														src={image}
														alt="pic"
													/>
													<button
														type="button"
														className={
															state.image_main !==
															""
																? "cursor-not-allowed"
																: "cursor-pointer"
														}
														onClick={() =>
															state.image_main !==
															""
																? toastError(
																		"Can't delete image if main is checked"
																  )
																: onImageRemove(
																		index
																  )
														}
														// disabled={
														//     state.image_main !==
														//     ""
														// }
													>
														<Trash2 />
													</button>
													<div className="form-control rounded-md py-1 px-3">
														<label className="label cursor-pointer">
															<input
																type="checkbox"
																className="checkbox"
																name="image_main"
																disabled={
																	state.image_main !==
																		index &&
																	state.image_main !==
																		""
																		? true
																		: false
																}
																onClick={(
																	event
																) => {
																	handlerImageMain(
																		event,
																		index
																	);
																}}
															/>
															<p className="ml-2">
																Main
															</p>
														</label>
													</div>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						)}
					</ImageUploading>

					<div className="modal-action">
						<label
							htmlFor="AddProductModal"
							className="btn"
							onClick={handlerReset}
						>
							Cancel
						</label>

						<button
							type="reset"
							className="btn btn-neutral"
							onClick={() => {
								toast.dismiss();

								toastInfo("Form has been reset");
								handlerReset();
							}}
						>
							Reset
						</button>
						<button type="button" className="btn btn-accent">
							Preview
						</button>
						<button
							type="submit"
							className="btn btn-primary"
							disabled={addProductForm.isSubmitting}
							ref={addProductButton}
						>
							add
						</button>
					</div>
				</form>
			</Modal>

			{/* EDIT PRODUCTS MODAL */}
			<Modal
				title="Edit Product"
				id="EditProductModal"
				handleModalOnClick={handlerReset}
			>
				{
					editProductData ? (
						<>
							<form
								onSubmit={handlerEditProduct}
								className="p4"
								ref={editProductForm}
							>
								<div>
									<label htmlFor="name" className="label">
										Name:
									</label>
									<input
										type="text"
										name="name"
										placeholder="Type name here"
										className="input input-bordered w-full"
										defaultValue={state.name}
										onChange={handleOnChange}
									/>
								</div>
								<div>
									<label
										htmlFor="description"
										className="label"
									>
										Description:
									</label>
									<textarea
										className="textarea textarea-bordered w-full"
										placeholder="Type description here"
										name="description"
										value={state.description}
										onChange={handleOnChange}
									></textarea>
								</div>

								<div className="flex gap-4">
									<div>
										<p className="label">Price:</p>
										<input
											type="text"
											name="price"
											className="input input-bordered w-full"
											value={state.price}
											onChange={handleOnChange}

											// pattern="^-?[0-9]\d*\.?\d*$"
										/>
									</div>
									<div>
										<p className="label">Stocks:</p>
										<input
											type="text"
											name="stock"
											className="input input-bordered w-full"
											value={state.stock}
											onChange={handleOnChange}
										/>
									</div>
								</div>

								<div>
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
															defaultChecked={
																state
																	.category[0] ===
																category
															}
															disabled={
																state
																	.category[0] &&
																state
																	.category[0] !==
																	category &&
																state
																	.category[0]
																	.length !==
																	0
																	? true
																	: false
															}
															onClick={
																handlerCategory
															}
														/>
														<span>{category}</span>
													</label>
												</div>
											);
										})}
									</div>
								</div>

								<ImageUploading
									multiple
									value={state.image}
									onChange={handlerImage}
									maxNumber={maxNumber}
									dataURLKey="data_url"
									onError={handlerImageError}
								>
									{({
										imageList,
										onImageUpload,
										onImageRemove,
										isDragging,
										dragProps,
									}) => (
										// BUILDING UI
										<div className="my-4">
											<button
												type="button"
												style={
													isDragging
														? { color: "red" }
														: undefined
												}
												className="btn btn-primary mr-4"
												onClick={onImageUpload}
												{...dragProps}
											>
												Upload Image
											</button>

											<div className="w-full bg-base-300 h-[300px] overflow-y-auto mt-4">
												<ul className="p-3 space-y-2">
													{imageList.map(
														(image, index) => {
															return (
																<li
																	className="flex items-center justify-around bg-base-100 p-2"
																	key={index}
																>
																	<Menu />
																	<img
																		className="object-fit w-[80px] h-[60px]"
																		src={
																			image
																		}
																		alt="pic"
																	/>
																	<button
																		type="button"
																		className={
																			state.image_main !==
																			""
																				? "cursor-not-allowed"
																				: "cursor-pointer"
																		}
																		onClick={() =>
																			state.image_main !==
																			""
																				? toastError(
																						"Can't delete image if main is checked"
																				  )
																				: onImageRemove(
																						index
																				  )
																		}
																		// disabled={
																		//     state.image_main !==
																		//     ""
																		// }
																	>
																		<Trash2 />
																	</button>
																	<div className="form-control rounded-md py-1 px-3">
																		<label className="label cursor-pointer">
																			<input
																				type="checkbox"
																				className="checkbox"
																				name="image_main"
																				defaultChecked={
																					state.image_main ===
																					index
																				}
																				disabled={
																					state.image_main !==
																						index &&
																					state.image_main !==
																						""
																						? true
																						: false
																				}
																				onClick={(
																					event
																				) => {
																					handlerImageMain(
																						event,
																						index
																					);
																				}}
																			/>
																			<p className="ml-2">
																				Main
																			</p>
																		</label>
																	</div>
																</li>
															);
														}
													)}
												</ul>
											</div>
										</div>
									)}
								</ImageUploading>
								<div className="modal-action">
									<label
										htmlFor="EditProductModal"
										className="btn"
										onClick={handlerReset}
									>
										Cancel
									</label>

									<button
										type="submit"
										className="btn btn-primary"
									>
										Update
									</button>
								</div>
							</form>
						</>
					) : null
					// <LoadingOverlay />
				}
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

						<label
							htmlFor="DeleteProductModal"
							className="btn btn-error"
							ref={modalDiscardClose}
							onClick={() => {
								deleteProductByID(state._id);
							}}
						>
							Delete
						</label>
					</div>
				</div>
			</Modal>

			<ToasterContainer />
		</>
	);
}

export default AdminProducts;
