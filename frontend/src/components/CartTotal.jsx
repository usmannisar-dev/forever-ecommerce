import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal}
          </p>
        </div>

        <hr />

        {/* Shipping */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {subtotal === 0 ? 0 : deliveryFee}
          </p>
        </div>

        {/* Total */}
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {total}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
