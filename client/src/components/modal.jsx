import React from "react";
import { X } from "react-feather";

function Modal(props) {
	const { title, children, id } = props;
	return (
		<>
			<input type="checkbox" id={id} className="modal-toggle" />
			<div className="modal block pt-10">
				<div className="modal-box mx-auto relative">
					<h2 className="text-2xl font-semibold">{title}</h2>
					{/* <label
						htmlFor={id}
						className="absolute right-6 top-6 cursor-pointer font-semibold"
					>
						<X />
					</label> */}
					{children}
				</div>
			</div>
		</>
	);
}

export default Modal;
