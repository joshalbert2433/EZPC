import React, {
	useContext,
	useReducer,
	useState,
	useEffect,
	useRef,
} from "react";
import { Plus, XCircle } from "react-feather";
import Modal from "../components/modal";
import { User } from "../reducer/userInfo";
import Ecomm from "../api/Ecomm.api";
import { getError } from "../utils/getError";
import * as yup from "yup";
import { useFormik } from "formik";
import {
	addressFormReducer,
	INITIAL_STATE,
} from "../reducer/addressFormReducer";
import {
	toastError,
	toastSuccess,
	ToasterContainer,
} from "../components/toaster";
import Pagination from "../components/pagination";
import DiscardModal from "../components/discardModal";
import { toast } from "react-toastify";

function Address() {
	const { state: ctxState, dispatch: ctxDispatch } = useContext(User);
	const { userInfo, cart } = ctxState;
	// const {shippingAddress} = cart
	const [addressData, setAddressData] = useState();
	const [formActive, setFormActive] = useState("");
	const [state, dispatch] = useReducer(addressFormReducer, INITIAL_STATE);
	const [page, setPage] = useState(1);
	const [tempId, setTempId] = useState("");

	const addAddressForm = useRef();
	const editAddressForm = useRef();
	const editCancelModal = useRef();
	const modalDiscardClose = useRef();

	let tempID = "";

	// console.log({ ctxDispatch });

	const getAddressByID = async () => {
		try {
			const url = `user/details/${userInfo._id}?page=${page}`;
			const response = await Ecomm.get(url);
			setAddressData(response.data);
			// console.log(addressData.data);
		} catch (error) {
			toastError(getError(error));
			console.log(error);
		}
	};

	const setDefaultAddress = async (id) => {
		try {
			// /details/setAddressDefault/:userId
			const url = `user/details/setAddressDefault/${id}`;
			await Ecomm.patch(url);

			toast.dismiss();
			toastSuccess("Default address updated");
			getAddressByID();
		} catch (error) {
			toastError(getError(error));
			console.log(error);
		}
	};

	const deleteAddressById = async (id) => {
		try {
			const url = `user/details/delete/${id}`;
			await Ecomm.delete(url);
			toastSuccess("Data has been deleted");
			getAddressByID();
		} catch (error) {
			// toastError(getError(error));
			console.log(error);
		}
	};

	useEffect(() => {
		getAddressByID();
		// console.log(addressData);

		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		getAddressByID();
		//eslint-disable-next-line
	}, [page]);

	const setDefaultHandler = (id) => {
		setDefaultAddress(id);
	};

	const handlerDelete = (e) => {
		e.preventDefault();
		deleteAddressById(tempID);
	};

	const saveAddressHandler = async (values, actions) => {
		console.log(formActive);
		if (formActive === "POST") {
			try {
				await Ecomm.post("user/details/register", {
					...values,
					user: userInfo._id,
				});
				ctxDispatch({
					type: "SAVE_SHIPPING_ADDRESS",
					payload: { ...values },
				});

				toastSuccess("Address Successfully Added");
				actions.resetForm();
				getAddressByID();
			} catch (error) {
				toastError(getError(error));
			}
		} else if (formActive === "PUT") {
			try {
				await Ecomm.patch(`user/details/${state._id}`, {
					...values,
					user: userInfo._id,
				});

				toastSuccess("Address Successfully Updated");
				getAddressByID();
				editCancelModal.current.click();
			} catch (error) {
				toastError(getError(error));
				console.log(error);
			}
		}
	};

	const schema = yup.object().shape({
		first_name: yup
			.string()
			.max(30, "Your first name is too long")
			.required("Required"),
		last_name: yup
			.string()
			.max(30, "Your last name is too long")
			.required("Required"),
		address: yup.string().required("Required"),
		city: yup.string().required("Required"),
		state: yup.string().required("Required"),
		zip_code: yup.string().required("Required"),
	});

	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleBlur,
		handleChange,
		handleSubmit,
		resetForm,
	} = useFormik({
		initialValues: {
			first_name: state.first_name || "",
			last_name: state.last_name || "",
			address: state.address || "",
			city: state.city || "",
			state: state.state || "",
			zip_code: state.zip_code || "",
			isMain: state.isMain || false,
		},
		validationSchema: schema,
		enableReinitialize: true,
		onSubmit: saveAddressHandler,
	});

	// console.log(state);

	return (
		<>
			<div className="w-[1200px] mx-auto ">
				<div className="flex justify-between p-4 items-center bg-base-100 rounded-lg">
					<h1 className="text-xl font-semibold">My Addresses</h1>
					<label
						htmlFor="AddAddressModal"
						className="btn btn-primary"
						onClick={() => {
							dispatch({ type: "RESET" });
						}}
					>
						<Plus /> Add New Address
					</label>
				</div>

				{addressData && addressData.data ? (
					<div className="overflow-x-auto p-2 md:p-0 my-4">
						<div className="overflow-x-auto">
							<table className="table table-fixed w-full ">
								<thead>
									<tr className="text-gray-200 [&>*]:bg-neutral ">
										<th className="w-[8%]"></th>
										<th className="w-[20%]">Full Name</th>
										<th className="w-[50%]">
											Complete Address
										</th>
										<th className="w-fit">Action</th>
									</tr>
								</thead>
								<tbody>
									{addressData.data.map((data) => {
										return (
											<tr key={data._id}>
												<td>
													{data.isMain ? (
														<p className="text-sm border border-gray-400 p-1 cursor-not-allowed text-center">
															Default
														</p>
													) : null}
												</td>
												<td className="truncate">
													{data.first_name}{" "}
													{data.last_name}
												</td>
												<td className="truncate">
													{data.address}, {data.city},{" "}
													{data.state},{" "}
													{data.zip_code}
												</td>
												<td>
													<div className="flex gap-4">
														<label
															htmlFor="EditAddressModal"
															className="link link-info"
															onClick={() => {
																dispatch({
																	type: "ASSIGN_DATA",
																	payload: {
																		data,
																	},
																});
															}}
														>
															Edit
														</label>
														<div
															className={`${
																data.isMain &&
																"tooltip tooltip-left"
															} `}
															data-tip="Default address cannot be deleted"
														>
															<label
																htmlFor={
																	!data.isMain
																		? "DeleteAddressModal"
																		: null
																}
																className={`link link-error ${
																	data.isMain &&
																	"cursor-not-allowed"
																}`}
																onClick={() => {
																	if (
																		!data.isMain
																	)
																		// tempID =
																		// 	data._id;
																		setTempId(
																			data._id
																		);
																}}
															>
																Delete
															</label>
														</div>
														{data.isMain ===
														false ? (
															<label
																className="link"
																onClick={() =>
																	setDefaultHandler(
																		data._id
																	)
																}
															>
																Set as default
															</label>
														) : (
															<label className="text-success">
																Default
															</label>
														)}
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				) : null}

				{addressData && addressData.data && addressData.total > 5 ? (
					<div className="flex justify-center py-5">
						<Pagination
							page={page}
							limit={addressData.limit ? addressData.limit : 0}
							total={addressData.total ? addressData.total : 0}
							setPage={(page) => setPage(page)}
						/>
					</div>
				) : null}
			</div>

			<Modal title="Add New Address" id="AddAddressModal">
				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					ref={addAddressForm}
				>
					<div className="form-control w-full">
						<label className="label">First Name</label>
						<input
							type="text"
							placeholder="Type first name here..."
							name="first_name"
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.first_name && touched.first_name
									? "input-error"
									: ""
							}`}
							value={values.first_name}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.first_name && touched.first_name && (
						<span className="text-error">{errors.first_name}</span>
					)}

					<div className="form-control w-full">
						<label className="label">Last Name</label>
						<input
							type="text"
							name="last_name"
							placeholder="Type last name here..."
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.first_name && touched.first_name
									? "input-error"
									: ""
							}`}
							value={values.last_name}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.last_name && touched.last_name && (
						<span className="text-error">{errors.last_name}</span>
					)}
					<div className="form-control w-full">
						<label className="label">Address</label>
						<textarea
							type="text"
							name="address"
							placeholder="Type address here..."
							className={`textarea textarea-bordered w-full ${
								errors.address && touched.address
									? "textarea-error"
									: ""
							}`}
							value={values.address}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.address && touched.address && (
						<span className="text-error">{errors.address}</span>
					)}
					<div className="form-control w-full">
						<label className="label">City</label>
						<input
							type="text"
							placeholder="Type city here..."
							name="city"
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.city && touched.city ? "input-error" : ""
							}`}
							value={values.city}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.city && touched.city && (
						<span className="text-error">{errors.city}</span>
					)}
					<div className="form-control w-full">
						<label className="label">State</label>
						<input
							type="text"
							name="state"
							placeholder="Type state here..."
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.state && touched.state
									? "input-error"
									: ""
							}`}
							value={values.state}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.state && touched.state && (
						<span className="text-error">{errors.state}</span>
					)}
					<div className="form-control w-full">
						<label className="label">Zip Code</label>
						<input
							type="text"
							name="zip_code"
							placeholder="Type zip code here..."
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.zip_code && touched.zip_code
									? "input-error"
									: ""
							}`}
							value={values.zip_code}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.zip_code && touched.zip_code && (
						<span className="text-error">{errors.zip_code}</span>
					)}
					<div className="modal-action">
						<label
							htmlFor="AddAddressModal"
							className="btn"
							onClick={() => resetForm()}
						>
							Cancel
						</label>
						<button
							disabled={isSubmitting}
							type="submit"
							className="btn btn-primary"
							onClick={() => setFormActive("POST")}
						>
							Save
						</button>
					</div>
				</form>
			</Modal>

			<Modal title="Edit Address" id="EditAddressModal">
				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					ref={editAddressForm}
				>
					<div className="form-control w-full">
						<label className="label">First Name</label>
						<input
							type="text"
							placeholder="Type first name here..."
							name="first_name"
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.first_name && touched.first_name
									? "input-error"
									: ""
							}`}
							value={values.first_name}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.first_name && touched.first_name && (
						<span className="text-error">{errors.first_name}</span>
					)}

					<div className="form-control w-full">
						<label className="label">Last Name</label>
						<input
							type="text"
							name="last_name"
							placeholder="Type last name here..."
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.first_name && touched.first_name
									? "input-error"
									: ""
							}`}
							value={values.last_name}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.last_name && touched.last_name && (
						<span className="text-error">{errors.last_name}</span>
					)}
					<div className="form-control w-full">
						<label className="label">Address</label>
						<textarea
							type="text"
							name="address"
							placeholder="Type address here..."
							className={`textarea textarea-bordered w-full ${
								errors.address && touched.address
									? "input-error"
									: ""
							}`}
							value={values.address}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.address && touched.address && (
						<span className="text-error">{errors.address}</span>
					)}
					<div className="form-control w-full">
						<label className="label">City</label>
						<input
							type="text"
							placeholder="Type city here..."
							name="city"
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.city && touched.city ? "input-error" : ""
							}`}
							value={values.city}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.city && touched.city && (
						<span className="text-error">{errors.city}</span>
					)}
					<div className="form-control w-full">
						<label className="label">State</label>
						<input
							type="text"
							name="state"
							placeholder="Type state here..."
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.state && touched.state
									? "input-error"
									: ""
							}`}
							value={values.state}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.state && touched.state && (
						<span className="text-error">{errors.state}</span>
					)}
					<div className="form-control w-full">
						<label className="label">Zip Code</label>
						<input
							type="text"
							name="zip_code"
							placeholder="Type zip code here..."
							className={`input input-sm md:input-md input-bordered w-full ${
								errors.zip_code && touched.zip_code
									? "input-error"
									: ""
							}`}
							value={values.zip_code}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>
					{errors.zip_code && touched.zip_code && (
						<span className="text-error">{errors.zip_code}</span>
					)}
					<div className="form-control w-full mt-4 items-center">
						<label className="label cursor-pointer w-1/2 bg-base-300 px-4 rounded">
							<input
								type="checkbox"
								name="isMain"
								className="checkbox"
								checked={values.isMain}
								onChange={handleChange}
								disabled={state.isMain}
							/>
							<p className="">Set as default address</p>
						</label>
					</div>
					<div className="modal-action">
						<label
							htmlFor="EditAddressModal"
							className="btn"
							onClick={() => {
								resetForm();
							}}
							ref={editCancelModal}
						>
							Cancel
						</label>

						<button
							disabled={isSubmitting}
							type="submit"
							className="btn btn-primary"
							onClick={() => {
								setFormActive("PUT");
							}}
						>
							Save
						</button>
					</div>
				</form>
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

						<label
							htmlFor="DeleteAddressModal"
							ref={modalDiscardClose}
							className="btn btn-error"
							onClick={() => {
								deleteAddressById(tempId);
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

export default Address;
