import React, { useContext, useEffect, useReducer, useState } from "react";
import Ecomm from "../api/Ecomm.api";
import { User } from "../services/reducers/userInfo";
import * as yup from "yup";
import { useFormik } from "formik";
import { toastError, ToasterContainer } from "../components/toaster";
import { getError } from "../services/utils/getError";
import { combineValues } from "../services/utils/combineValues";
import { useNavigate } from "react-router-dom";
import {
	INITIAL_STATE,
	checkoutFormReducer,
} from "../services/reducers/checkoutFormReducer";

function Checkout() {
	const { state: ctxState, dispatch: ctxDispatch } = useContext(User);
	const [state, dispatch] = useReducer(checkoutFormReducer, INITIAL_STATE);
	const [addressData, setAddressData] = useState();
	const [sameAddress, setSameAddress] = useState(false);
	const { userInfo } = ctxState;
	const navigate = useNavigate();

	const getAddressMain = async (userId) => {
		try {
			const response = await Ecomm.get(
				`user/details/${userId}?isMain=true`,
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);
			setAddressData(response.data);
			// dispatch({ type: "ASSIGN_DATA", payload: response.data });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// getAddressByID(userInfo._id);

		getAddressMain(userInfo._id);
		//eslint-disable-next-line
	}, []);

	const sameAddressHandler = (e) => {
		const { checked, value } = e.target;

		if (checked) {
			setSameAddress(true);
		} else {
			setSameAddress(false);
		}
	};

	const saveOrderHandler = async (values, actions) => {
		console.log(values);
		try {
			// * GET THE CART ITEMS
			const cartItems = JSON.parse(localStorage.getItem("cartItems"));
			const orderItems = cartItems.map((item) => ({
				product: item._id,
				quantity: item.quantity,
			}));

			// * GET THE TOTAL PRICE OF ORDER
			const itemIds = cartItems.map((item) => item._id);
			console.log(itemIds.toString());
			const response = await Ecomm.get(
				`products/getManyById?itemIds=${itemIds.toString()}`,
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);
			const { data: productData } = response.data;
			const result = combineValues(productData, cartItems);
			const priceArray = result.map((item) => item.price * item.quantity);
			const total_price = priceArray.reduce(
				(partialPrice, price) => partialPrice + price
			);

			//* REGISTER TO DATABASE
			await Ecomm.post(
				"/orders/register",
				{
					orderItems: orderItems,
					shipping_address: addressData,
					billing_address: values,
					user: userInfo._id,
					total_price: total_price,
				},
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);

			//* REMOVE THE CART IN LOCAL STORAGE AND USER CONTEXT
			ctxDispatch({ type: "CART_CLEAR" });
			localStorage.removeItem("cartItems");

			actions.resetForm();
			navigate("/orders");
		} catch (error) {
			toastError(getError(error));
			console.log(error);
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
			first_name:
				(sameAddress ? addressData?.first_name : state.first_name) ||
				"",
			last_name:
				(sameAddress ? addressData?.last_name : state.last_name) || "",
			address: (sameAddress ? addressData?.address : state.address) || "",
			city: (sameAddress ? addressData?.city : state.city) || "",
			state: (sameAddress ? addressData?.state : state.state) || "",
			zip_code:
				(sameAddress ? addressData?.zip_code : state.zip_code) || "",
		},
		validationSchema: schema,
		enableReinitialize: true,
		onSubmit: saveOrderHandler,
	});

	return (
		<>
			<div className="xl:w-[1200px] mx-auto">
				<form
					className="flex gap-6"
					onSubmit={handleSubmit}
					autoComplete="off"
				>
					<div className="bg-base-100 w-2/3">
						<div className="bg-base-100 p-4 rounded-md">
							<h2 className="text-2xl font-semibold">
								Billing Information
							</h2>
							<div className="form-control rounded-md py-1 px-3 w-fit">
								<label className="label cursor-pointer">
									<input
										type="checkbox"
										className="checkbox"
										onChange={sameAddressHandler}
									/>
									<p className="ml-2">
										Same as shipping address
									</p>
								</label>
							</div>
							<div className="form-control w-full">
								<label className="label">First Name</label>
								<input
									type="text"
									placeholder="Josh"
									name="first_name"
									className="input input-sm md:input-md input-bordered w-full "
									value={values.first_name}
									disabled={sameAddress}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.first_name && touched.first_name && (
									<span className="text-error">
										{errors.first_name}
									</span>
								)}
							</div>
							<div className="form-control w-full">
								<label className="label">Last Name</label>
								<input
									type="text"
									placeholder="Alberts"
									name="last_name"
									className="input input-sm md:input-md input-bordered w-full "
									value={values.last_name}
									disabled={sameAddress}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.last_name && touched.last_name && (
									<span className="text-error">
										{errors.last_name}
									</span>
								)}
							</div>
							<div className="form-control w-full">
								<label className="label">Address</label>
								<input
									type="text"
									placeholder="Malayo, Malapit, Di makita Street"
									name="address"
									className="input input-sm md:input-md input-bordered w-full "
									value={values.address}
									disabled={sameAddress}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.address && touched.address && (
									<span className="text-error">
										{errors.address}
									</span>
								)}
							</div>
							<div className="form-control w-full">
								<label className="label">City</label>
								<input
									type="text"
									placeholder="Imus"
									name="city"
									className="input input-sm md:input-md input-bordered w-full "
									value={values.city}
									disabled={sameAddress}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.city && touched.city && (
									<span className="text-error">
										{errors.city}
									</span>
								)}
							</div>
							<div className="form-control w-full">
								<label className="label">State</label>
								<input
									type="text"
									placeholder="Cavite"
									name="state"
									className="input input-sm md:input-md input-bordered w-full "
									value={values.state}
									disabled={sameAddress}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.state && touched.state && (
									<span className="text-error">
										{errors.state}
									</span>
								)}
							</div>
							<div className="form-control w-full">
								<label className="label">Zip Code</label>
								<input
									type="text"
									placeholder="4103"
									name="zip_code"
									className="input input-sm md:input-md input-bordered w-full"
									value={values.zip_code}
									disabled={sameAddress}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.zip_code && touched.zip_code && (
									<span className="text-error">
										{errors.zip_code}
									</span>
								)}
							</div>
						</div>
					</div>

					<div className="w-1/3">
						<div className="bg-base-100 p-4 h-fit">
							<div className="bg-base-100 rounded-md h-fit">
								<div className="form-control w-full">
									<label className="label">Card: </label>
									<input
										type="text"
										placeholder="Josh"
										className="input input-sm md:input-md input-bordered w-full "
									/>
								</div>
								<div className="form-control w-full">
									<label className="label">
										Security Code:{" "}
									</label>
									<input
										type="text"
										placeholder="Josh"
										className="input input-sm md:input-md input-bordered w-full "
									/>
								</div>
								<div className="form-control w-full">
									<label className="label">
										Expiration:{" "}
									</label>
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
							</div>
						</div>
						<button
							className="btn btn-secondary w-full mt-4 text-lg"
							type="submit"
							// onClick={navigate('')}
						>
							Pay Now
						</button>
					</div>
				</form>
			</div>
			<ToasterContainer />
		</>
	);
}

export default Checkout;
