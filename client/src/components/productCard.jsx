import React from "react";
import { Link } from "react-router-dom";

function ProductCard() {
    return (
        <Link to={{ pathname: "/product" }}>
            <div className="card rounded-none bg-base-100 w-[160px] hover:border-secondary border-transparent border-2">
                <figure>
                    <img
                        className="object-cover w-full h-40"
                        src="https://cdn.shopify.com/s/files/1/0101/4864/2879/products/5465-a_grande.jpg?v=1658707203"
                        alt="Graphics Card"
                    />
                </figure>
                <div className="card-body p-2">
                    <h2 className="card-title text-sm">
                        NVIDIA GeForce GTX 1050 - GPU Database
                    </h2>
                    <p className="text-secondary">&#8369;200</p>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
