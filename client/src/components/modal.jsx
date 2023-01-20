import React from "react";

function Modal(props) {
	const { title, children, id } = props;
	return (
		<>
			<input type="checkbox" id={id} className="modal-toggle" />
			<div className="modal block pt-10">
				<div className="modal-box mx-auto relative">
					<h2 className="text-2xl font-semibold">{title}</h2>
					{children}
				</div>
			</div>
		</>
	);
}

export default Modal;
