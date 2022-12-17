import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
    const { data, onClick } = props;
    // console.log(data.name);

    return (
        <Link
            to={`/product?name=${data.name}&&id=${data._id}&&category=${data.category[0]}`}
            onClick={onClick}
        >
            <div
                className="card rounded-none bg-base-100 w-[160px] hover:border-secondary border-transparent border-2 max-h-[255px]"
                onClick={onClick}
            >
                <figure>
                    <img
                        className="object-fill w-full h-40"
                        src={data.image[data.image_main]}
                        alt="Graphics Card"
                    />
                </figure>
                <div className="card-body p-2 ">
                    <p className="card-title text-sm font-normal block line-clamp-2 h-[45px]">
                        {data.name}
                    </p>
                    <p className="text-secondary">&#36;{data.price}</p>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
