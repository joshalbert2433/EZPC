import React from "react";
import Modal from "./modal";
import { X, XCircle } from "react-feather";

function DiscardModal(props) {
    const { id, handlerDelete } = props;
    return (
        <>
            <input type="checkbox" id={id} className="modal-toggle" />
            <form className="modal block pt-10" onSubmit={handlerDelete}>
                <div className="modal-box mx-auto relative">
                    {/* <h2 className="text-2xl font-semibold"></h2> */}
                    <label
                        htmlFor={id}
                        className="absolute right-6 top-6 cursor-pointer font-semibold"
                    >
                        <X />
                    </label>
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
                            <button type="submit" className="btn btn-error">
                                <label htmlFor="DeleteProductModal">
                                    Delete
                                </label>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default DiscardModal;