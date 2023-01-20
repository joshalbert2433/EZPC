import React from "react";

function ProductCardSkeleton({ index }) {
	return (
		<div className="card rounded-none w-[160px] border-transparent border-2 max-h-[255px] shadow-lg animate-pulse bg-base-100">
			<div className="w-full h-40 bg-base-300"></div>
			<div className="card-body p-2 ">
				<p className="h-[45px]"></p>
			</div>
		</div>
	);
}

export default ProductCardSkeleton;
