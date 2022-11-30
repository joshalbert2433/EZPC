import React from "react";

function Modal(props) {
    const { title, children } = props;
    return (
        <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal block pt-10">
                <div className="modal-box mx-auto">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{children}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">
                            Cancel
                        </label>
                        <button className="btn btn-secondary">Preview</button>
                        <button className="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
