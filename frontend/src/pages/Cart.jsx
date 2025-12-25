import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontendAssets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Build cart data from cartItems object
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) {
            tempData.push({
              _id: id,
              size: size,
              quantity: cartItems[id][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      {/* Title */}
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid 
                         grid-cols-[4fr_2fr_1fr] items-center gap-4"
            >
              {/* Left Side: Image + Details */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt={productData.name}
                />

                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-2 sm:gap-4 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>

                    {/* Size + Quantity + Delete */}
                    <div className="flex items-center gap-2">
                      {/* Size Box */}
                      <p className="px-2 sm:px-3 py-1 border bg-slate-50 rounded text-center w-12 sm:w-14">
                        {item.size}
                      </p>

                      {/* Quantity Input */}
                      <input
                        onChange={(e) =>
                          e.target.value === "" || e.target.value === "0"
                            ? null
                            : updateQuantity(
                                item._id,
                                item.size,
                                Number(e.target.value)
                              )
                        }
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        className="
                          border 
                          text-left 
                          w-12 sm:w-14 
                          px-2 py-1 
                          rounded 
                          transition-all duration-200 
                          focus:outline-none focus:ring-2 focus:ring-black
                        "
                      />

                      {/* Delete Icon */}
                      <img
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="w-4 sm:w-5 cursor-pointer hover:text-red-600 transition-colors duration-200"
                        src={assets.bin_icon}
                        alt="Delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total & Checkout */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/placeOrder")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
