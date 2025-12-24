import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, SetMethod] = useState("cod");

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    SetCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);

  const [formData, SetFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // ✅ FIXED: event.target (not taget)
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    SetFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const productInfo = structuredClone(
              products.find((p) => p._id === productId)
            );

            if (productInfo) {
              productInfo.size = size;
              productInfo.quantity = cartItems[productId][size];
              orderItems.push(productInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      // ✅ CASH ON DELIVERY
      if (method === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          SetCartItems({});
          toast.success("Order Placed Successfully");
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      }

      // 🔜 JazzCash / EasyPaisa later
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="border py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="border py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
          required
        />

        <input
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="border py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          required
        />

        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            className="border py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            className="border py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zip Code"
            required
          />
          <input
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            className="border py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="border py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone"
          required
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-8">
        <CartTotal />

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex flex-col gap-3">
            <div
              onClick={() => SetMethod("cod")}
              className="flex items-center gap-3 border p-2 cursor-pointer"
            >
              <div
                className={`h-3.5 w-3.5 rounded-full border ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              />
              <p>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
