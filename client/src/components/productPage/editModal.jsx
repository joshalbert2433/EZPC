import React from "react";
import Modal from "../modal";
import { Menu, Trash2 } from "react-feather";

function EditModal(props) {
    const { title, id, data, categories } = props;
    return (
        <Modal title={title} id={id}>
            {
                data ? (
                    <>
                        <div className="p4">
                            <div>
                                <label htmlFor="name" className="label">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Type name here"
                                    className="input input-bordered w-full"
                                    defaultValue={data.name}
                                    // onChange={handleOnChange}
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
                                    defaultValue={data.description}
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
                                                    defaultChecked={
                                                        data.category[0] ===
                                                        category
                                                    }
                                                    disabled={
                                                        data.category[0] !==
                                                            category &&
                                                        data.category[0]
                                                            .length !== 0
                                                            ? true
                                                            : false
                                                    }
                                                    // onClick={
                                                    //     // handlerEditCategory
                                                    // }
                                                />
                                                <span>{category}</span>
                                            </label>
                                        </div>
                                    );
                                })}
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
                            <button className="btn btn-secondary">
                                Preview
                            </button>
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </>
                ) : null
                // <LoadingOverlay />
            }
        </Modal>
    );
}

export default EditModal;
