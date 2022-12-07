import React, { useReducer, useState, useEffect, useRef } from "react";
import NavBar from "../partials/navBar";
import Modal from "../../components/modal";
import EcommAPI from "../../api/Ecomm.api";
import { Menu, Trash2, XCircle } from "react-feather";
import EcomAPI from "../../api/Ecomm.api";
import ImageUploading from "react-images-uploading";
import Skeleton from "../../components/skeleton";
import {
    ToasterContainer,
    toastInfo,
    toastError,
    toastWarning,
    toastSuccess,
} from "../../components/toaster";
import "react-toastify/dist/ReactToastify.css";

import {
    addProductsFormReducer,
    INITIAL_STATE,
} from "../../reducer/productsFormReducer";
import { toast } from "react-toastify";
import DiscardModal from "../../components/discardModal";

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
    const addProductForm = useRef();
    const maxNumber = 10;

    const getAllProducts = async () => {
        try {
            const response = await EcommAPI.get("products");
            setProductData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllProducts();
        // console.log(productData);
    }, []);

    useEffect(() => {
        // console.log(state);
        console.log(productData);
    }, [productData]);

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: name, value: value },
        });
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
        addProductForm.current.reset();

        dispatch({
            type: "RESET",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        if (state.image.length === 0) {
            form_errors.push("Must select at least one image");
        } else if (state.image.length !== 0 && state.image_main.length === 0) {
            form_errors.push("Must select main image for product");
        }

        if (form_errors.length > 0) {
            form_errors.map((error) => {
                return toastError(error);
            });
            return;
        }

        //CONVERT DATA URL OBJECT INTO ARRAY
        const imageDataUrl = state.image.map((element) => {
            return element.data_url;
        });

        try {
            await EcomAPI.post("products/register", {
                name: state.name,
                description: state.description,
                image: imageDataUrl,
                category: state.category,
                image_main: state.image_main,
            });
        } catch (error) {
            console.log(error);
        }
        toastSuccess("Product Successfully Added");
        handlerReset();
    };

    const handlerImageError = (error) => {
        toastError(`Image upload limit is ${maxNumber}`);
    };

    return (
        <>
            <NavBar />
            <div className="w-[1200px] mx-auto">
                <div className="flex justify-between">
                    <div className="form-control">
                        <div className="input-group">
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
                    <label
                        htmlFor="AddProductModal"
                        className="btn btn-primary"
                    >
                        Add new product
                    </label>
                </div>
                {productData ? (
                    <div className="overflow-x-auto p-2 md:p-0 my-4">
                        <div className="overflow-x-auto">
                            <table className="table w-full ">
                                <thead>
                                    <tr className="text-gray-200 [&>*]:bg-neutral ">
                                        <th>Picture</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Inventory Count</th>
                                        <th>Quantity Sold</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.data.map((data) => {
                                        return (
                                            <tr key={data._id}>
                                                <td>
                                                    <img
                                                        className="object-fit w-[80px] h-[60px]"
                                                        src={
                                                            data.image[
                                                                data.image_main
                                                            ]
                                                        }
                                                        alt="pic"
                                                    />
                                                </td>
                                                <td>{data._id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.stock}</td>
                                                <td>Blue</td>
                                                <td>
                                                    <div className="flex gap-4">
                                                        <label
                                                            htmlFor="EditProductModal"
                                                            className="link link-info"
                                                        >
                                                            Edit
                                                        </label>
                                                        <label
                                                            htmlFor="DeleteProductModal"
                                                            className="link link-error"
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

                <div className="flex justify-center py-5">
                    <div className="btn-group">
                        <button className="btn">1</button>
                        <button className="btn btn-active">2</button>
                        <button className="btn">3</button>
                        <button className="btn">4</button>
                        <button className="btn">5</button>
                    </div>
                </div>
            </div>

            <Modal
                title="Add New Product"
                id="AddProductModal"
                handleModalOnClick={handlerReset}
            >
                <form
                    onSubmit={handleSubmit}
                    // encType="multipart/form-data"
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
                    {/* <div className="my-4">
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs hidden"
                        />
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Upload"
                        />
                    </div> */}

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
                                                        src={image["data_url"]}
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

                    {/* <div className="w-full bg-base-300 h-[300px]">
                        <ul className="p-3">
                            <li className="flex items-center justify-around bg-base-100 p-2">
                                <Menu />
                                <img
                                    className="object-fit w-[80px] h-[60px]"
                                    src="https://media.istockphoto.com/id/1190641416/photo/streaming-live-esport-event-on-computer-at-home.jpg?b=1&s=170667a&w=0&k=20&c=zsbJz2Ua_QZeMI0Zuw4OLegmdjIWwy8j5ZDczBjEVFw="
                                    alt="pic"
                                />
                                <Trash2 />
                                <div className="form-control rounded-md py-1 px-3">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                        />
                                        <p className="ml-2">Main</p>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div> */}

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
                                toastInfo("Form has been reset");
                                handlerReset();
                            }}
                        >
                            Reset
                        </button>
                        <button type="button" className="btn btn-accent">
                            Preview
                        </button>
                        <button type="submit" className="btn btn-primary">
                            add
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal title="Edit Product" id="EditProductModal">
                <div className="p4">
                    <div>
                        <label htmlFor="name" className="label">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Type name here"
                            className="input input-bordered w-full "
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
                        ></textarea>
                    </div>
                    <p className="label">Category:</p>

                    <div className="h-[200px] w-full border-opacity-10 p-4 grid grid-cols-2 gap-2 overflow-y-auto [&>*]:h-fit">
                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    name="category"
                                    value="processor"
                                />
                                <span>Processor</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    name="category"
                                    value="graphics card"
                                />
                                <span>Graphics Card</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox" />
                                <span>Motherboard</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox" />
                                <span>Monitor</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox" />
                                <span>Memory</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox" />
                                <span>Storage</span>
                            </label>
                        </div>

                        <div className="form-control  bg-base-200 rounded-md px-2">
                            <label className="label cursor-pointer">
                                <input type="checkbox" className="checkbox" />
                                <span>Power Supply</span>
                            </label>
                        </div>
                    </div>
                    <form action="/" method="POST" className="my-4">
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs hidden"
                        />
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Upload"
                        />
                    </form>

                    <div className="w-full bg-base-300 h-[300px]">
                        <ul className="p-3">
                            <li className="flex items-center justify-around bg-base-100 p-2">
                                <Menu />
                                <img
                                    className="object-fit w-[80px] h-[60px]"
                                    src="https://media.istockphoto.com/id/1190641416/photo/streaming-live-esport-event-on-computer-at-home.jpg?b=1&s=170667a&w=0&k=20&c=zsbJz2Ua_QZeMI0Zuw4OLegmdjIWwy8j5ZDczBjEVFw="
                                    alt="pic"
                                />
                                <Trash2 />
                                <div className="form-control rounded-md py-1 px-3">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                        />
                                        <p className="ml-2">Main</p>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="modal-action">
                    <label htmlFor="EditProductModal" className="btn">
                        Cancel
                    </label>
                    <button className="btn btn-secondary">Preview</button>
                    <button className="btn btn-primary">Update</button>
                </div>
            </Modal>

            <DiscardModal id="DeleteProductModal" />

            <ToasterContainer />
        </>
    );
}

export default AdminProducts;
