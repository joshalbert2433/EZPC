import React, { useState, useEffect } from "react";
import NavBar from "./partials/navBar";
import ProductCard from "../components/productCard";
import EcommAPI from "../api/Ecomm.api";
import { Navigation, Thumbs } from "swiper";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Products() {
    const [activeThumb, setActiveThumb] = useState(null);
    const [productData, setProductData] = useState();
    const [similarProductData, setSimilarProductData] = useState();
    // const idParams = useParams();
    const navigate = useNavigate();

    // GET THE QUERY PARAMETERS
    const search = useLocation().search;
    const urlName = new URLSearchParams(search).get("name");
    const urlId = new URLSearchParams(search).get("id");
    const urlCategory = new URLSearchParams(search).get("category");

    const [id, setId] = useState();

    const getProductById = async (id) => {
        try {
            const response = await EcommAPI.get(`products/${id}`);
            setProductData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProductByCategory = async (category) => {
        try {
            const response = await EcommAPI.get(
                `products?category=${category}`
            );

            setSimilarProductData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductById(urlId);
        // getProductByCategory("Motherboard");
        getProductByCategory(urlCategory);

        setId(urlId);

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        // getProductByCategory(productData.category);

        console.log(similarProductData);
    }, [similarProductData, id]);

    // useEffect(() => {
    //     if (activeThumb) console.log(activeThumb.activeIndex);
    // }, [activeThumb]);

    console.log(similarProductData);
    return (
        <>
            <NavBar />
            <div className="w-[1200px] mx-auto">
                {productData ? (
                    <div className="bg-base-100  flex">
                        <div className="w-[40%] p-4">
                            <Swiper
                                loop={true}
                                spaceBetween={10}
                                navigation={productData.image.length > 1}
                                modules={[Navigation, Thumbs]}
                                grabCursor={true}
                                thumbs={{ swiper: activeThumb }}
                            >
                                {productData.image.map((item, index) => (
                                    <SwiperSlide
                                        key={index}
                                        // className="relative overflow-hidden pt-[100%]"
                                        className="flex justify-center h-[400px]"
                                    >
                                        <img
                                            src={item}
                                            alt="product images"
                                            // className="absolute top-0 left-0"
                                            // className="h-[200px]"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            {productData.image.length > 2 ? (
                                <Swiper
                                    onSwiper={setActiveThumb}
                                    // loop={true}
                                    spaceBetween={10}
                                    slidesPerView={
                                        productData.image.length <= 3
                                            ? productData.image.length
                                            : 4
                                    }
                                    modules={[Navigation, Thumbs]}
                                    className="mt-4 "
                                >
                                    {productData.image.map((item, index) => (
                                        <SwiperSlide key={index} className="">
                                            <div className="h-[100px]">
                                                <img
                                                    src={item}
                                                    alt="product images"
                                                    className="h-full w-full mx-auto hover:border-2 hover:border-primary"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : null}
                        </div>
                        <div className="w-[60%] p-4 space-y-3 pb-6">
                            <h1 className="text-xl font-semibold">
                                {productData.name}
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
                                <p className="p-2 h-[300px] whitespace-pre-line overflow-auto">
                                    {productData.description}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button className="btn btn-primary">
                                    Add to cart
                                </button>
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
                ) : null}

                <div className="mt-5">
                    <p className="text-xl font-semibold mb-3">Similar</p>
                    <div className=" flex gap-y-4 flex-wrap justify-between">
                        {similarProductData
                            ? similarProductData.data.map((data) => {
                                  return (
                                      <ProductCard
                                          key={data._id}
                                          data={data}
                                          //   Link={Link}
                                          //   link={`product?name=${data.name}&&id=${data._id}`}
                                          //   onClick={() => {
                                          //       navigate(
                                          //           `product?name=${data.name}&&id=${data._id}`
                                          //       );
                                          //   }}
                                          onClick={() => {
                                              setActiveThumb(null);
                                              getProductById(data._id);
                                          }}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
