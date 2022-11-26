import React, { useState } from "react";
import NavBar from "./partials/navBar";
import ProductCard from "../components/productCard";

import { Navigation, Pagination, Scrollbar, A11y, Thumbs } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Products() {
    const [activeThumb, setActiveThumb] = useState(null);

    return (
        <>
            <NavBar />
            <div className="w-[1200px] mx-auto">
                <div className="bg-base-100  flex">
                    <div className="w-[40%]">
                        <Swiper
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            modules={[Navigation, Thumbs]}
                            grabCursor={true}
                            thumbs={{
                                swiper:
                                    activeThumb && !activeThumb.destroyed
                                        ? activeThumb
                                        : null,
                            }}
                            className="product-images-slider"
                        >
                            <SwiperSlide className="w-[500px]">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeENtdmuitYiIJLhLdX9fo9ydCMDvYKo0s0g&usqp=CAU"
                                    alt="product images"
                                />
                            </SwiperSlide>
                        </Swiper>
                        <Swiper
                            onSwiper={setActiveThumb}
                            watchSlidesProgress
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            modules={[Navigation, Thumbs]}
                            className="product-images-slider-thumbs"
                        >
                            <SwiperSlide>
                                <div className="product-images-slider-thumbs-wrapper">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeENtdmuitYiIJLhLdX9fo9ydCMDvYKo0s0g&usqp=CAU"
                                        alt="product images"
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="w-[60%] px-4 py-2 space-y-3 pb-6">
                        <h1 className="text-xl font-semibold">
                            Coffee A Hug In A Mug Designed Solid Drop Shoulder T
                            Shirt (Unisex)
                        </h1>
                        <div className="flex items-center gap-2">
                            <p className="text-xl text-secondary underline">
                                5
                            </p>
                            <div className="rating rating-sm">
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    disabled
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    disabled
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    disabled
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    disabled
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    disabled
                                />
                            </div>
                        </div>
                        <h2 className="text-3xl text-secondary font-semibold">
                            &#8369;200
                        </h2>
                        <div>
                            <h2 className="text-lg font-semibold p-4 bg-base-200">
                                Product Description
                            </h2>
                            <p className="p-2">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aliquid reiciendis molestias
                                id cupiditate repellendus, pariatur quod
                                necessitatibus, eaque enim debitis quia dolor a
                                autem temporibus? Quo voluptatem saepe sed. Odit
                                corporis, dolorem officia ut tempore earum
                                soluta, blanditiis accusantium maxime quaerat
                                voluptatum libero maiores placeat laboriosam
                                excepturi architecto veritatis esse, itaque sit
                                ullam aut id? Delectus veritatis, repellendus
                                iure sit ea quia! Officia iure, illo quos,
                                praesentium tempora consequuntur porro dolore,
                                officiis reiciendis magnam quasi nobis corporis
                                vitae provident aut harum! Eveniet, praesentium,
                                sunt, aut fugit necessitatibus harum
                                consequuntur molestias quaerat temporibus quidem
                                laborum aliquam itaque odit laudantium non
                                nobis.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="btn btn-primary">Buy</button>
                            <select className="select select-bordered w-[200px] text-center select-xl">
                                <option disabled selected>
                                    Select Quantity
                                </option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <p className="text-xl font-semibold mb-3">Similar</p>
                    <div className=" flex gap-y-4 flex-wrap justify-between">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
