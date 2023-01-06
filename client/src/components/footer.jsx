import React from "react";

function Footer() {
	return (
		<div className="w-full bg-base-100 flex justify-center items-center h-16 mt-8 shadow-lg">
			<div className="text-sm">
				{" "}
				&#169; {new Date().getFullYear()} Joshua Albert Villanueva
			</div>
		</div>
	);
}

export default Footer;
