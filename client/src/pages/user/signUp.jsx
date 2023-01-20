import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
	signUpFormReducer,
	INITIAL_STATE,
} from "../../services/reducers/signUpFromReducer";
import Ecomm from "../../api/Ecomm.api";
import {
	toastError,
	toastSuccess,
	ToasterContainer,
} from "../../components/toaster";
import { getError } from "../../services/utils/getError";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function SignUp() {
	const [state] = useReducer(signUpFormReducer, INITIAL_STATE);

	const saveSignUpHandler = async (values, actions) => {
		try {
			await Ecomm.post("auth/register", {
				email: values.email,
				password: values.password,
			});
			toastSuccess("Address Successfully Added");
			actions.resetForm();
		} catch (error) {
			toast.dismiss();
			toastError(getError(error));
			console.log(error);
		}
	};

	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Must be valid email address")
			.required("Required"),
		password: yup
			.string()
			.min(8, "Password is too short - should be 8 chars minimum.")
			.matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
			.required("Required"),
		confirm_password: yup
			.string()
			.required("Passwords did not match")
			.oneOf([yup.ref("password"), null], "Passwords did not match"),
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
			email: state.email || "",
			password: state.password || "",
			confirm_password: state.confirm_password || "",
		},

		validationSchema: schema,
		// enableReinitialize: true,
		onSubmit: saveSignUpHandler,
	});

	return (
		<>
			<Helmet>
				<title>EZPC | Sign Up</title>
			</Helmet>
			<div className="w-[400px] mx-auto bg-base-100 py-5 px-12 rounded">
				<form action="#" method="POST" className="space-y-4">
					<h1 className="text-3xl font-semibold py-4 w-fit mx-auto">
						Sign Up
					</h1>

					<div>
						<label htmlFor="email" className="label">
							Email Address
						</label>
						<input
							type="text"
							name="email"
							placeholder="Email Address"
							className={`input input-bordered w-full  ${
								errors.email && touched.email
									? "input-error"
									: ""
							}`}
							value={values.email}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
						{errors.email && touched.email && (
							<span className="text-error">{errors.email}</span>
						)}
					</div>
					<div>
						<label htmlFor="password" className="label">
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className={`input input-bordered w-full ${
								errors.password && touched.password
									? "input-error"
									: ""
							}`}
							value={values.password}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
						{errors.password && touched.password && (
							<span className="text-error">
								{errors.password}
							</span>
						)}
					</div>
					<div>
						<label htmlFor="confirm_password" className="label">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirm_password"
							placeholder="Confirm Password"
							className={`input input-bordered w-full ${
								errors.confirm_password &&
								touched.confirm_password
									? "input-error"
									: ""
							}`}
							value={values.confirm_password}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
						{errors.confirm_password &&
							touched.confirm_password && (
								<span className="text-error">
									{errors.confirm_password}
								</span>
							)}
					</div>
					<input
						type="submit"
						value="Sign Up"
						className="btn btn-primary w-full"
						onClick={handleSubmit}
					/>
				</form>
				<div className="flex items-center gap-2 w-fit mx-auto">
					<p className="py-8">Have an account?</p>
					<Link
						to={{ pathname: "/login" }}
						className="link link-primary font-semibold no-underline"
					>
						Login
					</Link>
				</div>
			</div>
			<ToasterContainer />
		</>
	);
}

export default SignUp;
