import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Order Page</h3>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      {!loading &&
        orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-gray-700"
          >
            {/* Show first product image instead of parcel icon */}
            <img
              className="w-12 h-12 object-cover rounded"
              src={order.items[0]?.image[0]}
              alt={order.items[0]?.name || "Product Image"}
            />

            {/* Order Products */}
            <div>
              <div>
                {order.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex gap-2 items-center py-0.5"
                  >
                    <p>
                      {item.name} X {item.quantity} <span>{item.size}</span>
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-1 mb-2 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city},{order.address.state},
                  {order.address.country},{order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-5">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status || "Order Placed"}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
    </div>
  );
};

export default Orders;
