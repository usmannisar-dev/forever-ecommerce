import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, SetOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        SetOrderData(response.data.orders);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-4">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((order, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            {order.items.map((product, i) => (
              <div
                key={i}
                className="py-4 border-t text-gray-700 
                   flex flex-col md:flex-row md:items-center 
                   md:justify-between gap-4"
              >
                {/* LEFT */}
                <div className="flex items-start gap-6 text-sm">
                  <img
                    className="w-16 sm:w-20"
                    src={product.image[0]}
                    alt={product.name}
                  />

                  <div>
                    <p className="sm:text-base font-medium">{product.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-lg">
                        {currency}
                        {product.price}
                      </p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Size: {product.size}</p>
                    </div>

                    <p className="mt-1">
                      Date:{" "}
                      <span className="text-gray-400">
                        {new Date(order.date).toDateString()}
                      </span>
                    </p>

                    <p className="mt-1">
                      Payment:{" "}
                      <span className="text-gray-400">
                        {order.paymentMethod}
                      </span>
                    </p>

                  </div>
                </div>

                {/* RIGHT */}
                <div className="md:w-1/2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <p className="text-sm">{order.status}</p>
                  </div>

                  <button className="border font-medium px-4 py-2 text-sm rounded-sm">
                    Track Order
                  </button>
                </div>
              </div>
            ))}

            {/* ORDER TOTAL */}
            <p className="text-right font-semibold mt-2">
              Total: {currency}
              {order.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
