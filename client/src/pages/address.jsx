import React, { useContext, useReducer, useState, useEffect } from "react";
import { Plus, XCircle, Check } from "react-feather";
import Modal from "../components/modal";
import { User } from "../reducer/userInfo";
import useLocalStorage from "../hooks/useLocalStorage";
import Ecomm from "../api/Ecomm.api";
import { getError } from "../utils/getError";
import * as yup from "yup";
import { useFormik, useFormikContext } from "formik";
import {
    addressFormReducer,
    INITIAL_STATE,
} from "../reducer/addressFormReducer";
import {
    toastError,
    toastSuccess,
    ToasterContainer,
} from "../components/toaster";

function Address() {
    const { state: ctxState } = useContext(User);
    const { userInfo } = ctxState;
    const [addressData, setAddressData] = useState();
    const [formActive, setFormActive] = useState("");

    const getAddressByID = async () => {
        try {
            const response = await Ecomm.get(`user/details/${userInfo._id}`);
            setAddressData(response.data);
            // console.log(addressData.data);
        } catch (error) {
            toastError(getError(error));
            console.log(error);
        }
    };

    useEffect(() => {
        getAddressByID();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(addressData);
        //eslint-disable-next-line
    }, [addressData]);

    const saveAddressHandler = async (values, actions) => {
        console.log(
            "🚀 ~ file: address.jsx:51 ~ saveAddressHandler ~ actions",
            actions
        );
        console.log(
            "🚀 ~ file: address.jsx:51 ~ saveAddressHandler ~ values",
            values
        );
        console.log(
            "🚀 ~ file: address.jsx:65 ~ saveAddressHandler ~ userInfo.zip_code,",
            userInfo._id
        );
        console.log(formActive);
        if (formActive === "POST") {
            try {
                await Ecomm.post("user/details/register", {
                    ...values,
                    user: userInfo._id,
                });

                toastSuccess("Product Successfully Added");
                actions.resetForm();
            } catch (error) {
                toastError(getError(error));
            }
        } else if (formActive === "PUT") {
            console.log("PUT CHONG");
        }
    };

    const schema = yup.object().shape({
        first_name: yup.string().required("Required"),
        last_name: yup.string().required("Required"),
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
    } = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            address: "",
            city: "",
            state: "",
            zip_code: "",
            isMain: false,
        },
        validationSchema: schema,
        // onSubmit: () => {
        //     console.log(formActive);

        //     saveAddressHandler();
        // },
        onSubmit: saveAddressHandler,
        // onSubmit={values => { handleSubmit(values, myCustomParam);
    });

    return (
        <>
            <div className="w-[1200px] mx-auto ">
                <div className="flex justify-between p-4 items-center bg-base-100 rounded-lg">
                    <h1 className="text-xl font-semibold">My Addresses</h1>
                    <label
                        htmlFor="AddAddressModal"
                        className="btn btn-primary"
                    >
                        <Plus /> Add New Address
                    </label>
                </div>
                {addressData ? (
                    <div className="overflow-x-auto p-2 md:p-0 my-4">
                        <div className="overflow-x-auto">
                            {/* <pre>{JSON.stringify(addressData, null, 2)}</pre> */}

                            <table className="table w-full ">
                                <thead>
                                    <tr className="text-gray-200 [&>*]:bg-neutral ">
                                        <th>Default</th>
                                        <th>Full Name</th>
                                        <th>Complete Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addressData.map((data) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <Check />
                                                </td>
                                                <td>
                                                    {data.first_name}{" "}
                                                    {data.last_name}
                                                </td>
                                                <td>
                                                    {data.address}, {data.city},{" "}
                                                    {data.state},{" "}
                                                    {data.zip_code}
                                                </td>
                                                <td>
                                                    <div className="flex gap-4">
                                                        <label
                                                            htmlFor="EditAddressModal"
                                                            className="link link-info"
                                                        >
                                                            Edit
                                                        </label>
                                                        <label
                                                            htmlFor="DeleteAddressModal"
                                                            className="link link-error"
                                                        >
                                                            Delete
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {/* <tr>
                                        <td>
                                            <Check />
                                        </td>
                                        <td>Michael Jordan</td>
                                        <td>
                                            143 Delicades Street Tondo, Manila,
                                            4104
                                        </td>
                                        <td>
                                            <div className="flex gap-4">
                                                <label
                                                    htmlFor="EditAddressModal"
                                                    className="link link-info"
                                                >
                                                    Edit
                                                </label>
                                                <label
                                                    htmlFor="DeleteAddressModal"
                                                    className="link link-error"
                                                >
                                                    Delete
                                                </label>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td>Michael Jordan</td>
                                        <td>
                                            143 Delicades Street Tondo, Manila,
                                            4104
                                        </td>
                                        <td>
                                            <div className="flex gap-4">
                                                <label
                                                    htmlFor="EditAddressModal"
                                                    className="link link-info"
                                                >
                                                    Edit
                                                </label>
                                                <label
                                                    htmlFor="DeleteAddressModal"
                                                    className="link link-error"
                                                >
                                                    Delete
                                                </label>
                                            </div>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}
            </div>

            <Modal title="Add New Address" id="AddAddressModal">
                <form onSubmit={handleSubmit} autoComplete="off">
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
                        <input
                            type="text"
                            name="address"
                            placeholder="Type address here..."
                            className={`input input-sm md:input-md input-bordered w-full ${
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
                                onClick={handleChange}
                            />
                            <p className="">Set as default address</p>
                        </label>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="AddAddressModal" className="btn">
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
                <div className="modal-action">
                    <label htmlFor="EditAddressModal" className="btn">
                        Cancel
                    </label>
                    <button className="btn btn-primary">Edit</button>
                </div>
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
                        <button className="btn btn-error">Delete</button>
                    </div>
                </div>
            </Modal>

            <ToasterContainer />
        </>
    );
}

export default Address;
