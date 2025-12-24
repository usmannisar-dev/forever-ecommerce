import React, { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs";
  const deliveryFee = 200;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [search, SetSearch] = useState("");
  const [showSearch, SetShowSearch] = useState(false);
  const [cartItems, SetCartItems] = useState({});
  const [products, SetProducts] = useState([]);
  const [token, SetToken] = useState("");

  const navigate = useNavigate();

  // ================= FETCH PRODUCTS =================
  const getProductData = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        SetProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  // ================= GET USER CART =================
  const getUserCart = useCallback(
    async (token) => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          SetCartItems(response.data.cartData);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendUrl]
  );

  // ================= ADD TO CART =================
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    SetCartItems(cartData);
    toast.success("Added to cart!");

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // ================= UPDATE CART =================
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    SetCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // ================= CART COUNT =================
  const getCartCount = () => {
    let total = 0;
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        total += cartItems[id][size];
      }
    }
    return total;
  };

  // ================= CART AMOUNT =================
  const getCartAmount = () => {
    let total = 0;

    for (let id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (!product) continue;

      for (let size in cartItems[id]) {
        total += product.price * cartItems[id][size];
      }
    }

    return total;
  };

  // ================= EFFECTS =================
  useEffect(() => {
    getProductData();
  }, [getProductData]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      SetToken(storedToken);
      getUserCart(storedToken);
    }
  }, [token, getUserCart]);

  // ================= CONTEXT VALUE =================
  const value = {
    products,
    currency,
    deliveryFee,
    search,
    SetSearch,
    showSearch,
    SetShowSearch,
    cartItems,
    SetCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    SetToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
