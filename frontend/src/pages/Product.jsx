import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontendAssets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productid } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});

  // Fetch product by ID
  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productid);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image?.[0] || "");
    }
  }, [productid, products]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* -------- PRODUCT IMAGES -------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18.7%] w-full">
            {productData.image?.map((img, idx) => (
              <img
                key={idx}
                onClick={() => setImage(img)}
                src={img}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="product-thumbnail"
              />
            ))}
          </div>

          {/* Main Image */}
          <div
            className="w-full sm:w-[80%] overflow-hidden relative group"
            onMouseMove={(e) => {
              const { left, top, width, height } =
                e.currentTarget.getBoundingClientRect();

              const x = ((e.pageX - left) / width) * 100;
              const y = ((e.pageY - top) / height) * 100;

              setZoomStyle({
                transformOrigin: `${x}% ${y}%`,
                transform: "scale(1.7)",
              });
            }}
            onMouseLeave={() =>
              setZoomStyle({
                transform: "scale(1)",
                transformOrigin: "center",
              })
            }
          >
            <img
              src={image}
              alt="product"
              className="w-full h-auto transition-transform duration-300 ease-out cursor-zoom-in"
              style={zoomStyle}
            />
          </div>
        </div>

        {/* -------- PRODUCT INFO -------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4].map((star) => (
              <img key={star} alt="" src={assets.star_icon} className="w-3.5" />
            ))}
            <img alt="" src={assets.star_dull_icon} className="w-3.5" />
            <p className="pl-2">122</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>

            <div className="flex gap-2">
              {productData.sizes?.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    size === item ? "border-orange-500 border-2" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* -------- DESCRIPTION & REVIEW -------- */}
      <div className="mt-20">
        <div className="flex">
          <div className="border px-5 py-3 text-sm">Description</div>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>

        <div className="flex flex-col gap-4 border py-6 px-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
            earum reprehenderit libero minus officiis corrupti est voluptate
            similique ad ipsa! Esse, voluptatum animi qui excepturi ipsa quod
            nam libero velit. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Provident magnam nihil sequi incidunt cupiditate
            vero saepe minus quaerat voluptates, deleniti adipisci alias quae
            harum?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            ipsam quos tempora molestias facilis quo facere temporibus provident
            illum cum esse, eos nemo eius sequi. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Totam tempore beatae aliquam sit
            possimus mollitia magnam voluptatem architecto, velit perspiciatis.
            Quas rerum modi cupiditate!
          </p>
        </div>

        {/* Related Products (you can add later) */}
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
