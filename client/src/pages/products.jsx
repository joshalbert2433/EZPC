import React, { useState } from "react";
import NavBar from "./partials/navBar";
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
            <div className="w-[1200px] bg-base-100 mx-auto">
                <div className="w-[400px]">
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
            </div>
        </>
    );
}

export default Products;
