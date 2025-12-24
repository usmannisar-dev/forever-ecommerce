import React from "react";
import { assets } from "../assets/frontendAssets/assets";

const Footer = () => {
  return (
    <div className="mt-40">
      {/* --- TOP GRID --- */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        {/* Logo + Text */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Forever is your trusted online store for quality, affordable fashion
            and lifestyle products. We focus on comfort, style, and customer
            satisfaction. Shop smart, shop Forever.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+92 324 43 662 43</li>
            <li>uchohan804@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* --- BOTTOM COPYRIGHT (FULL WIDTH) --- */}
      <hr />
      <p className="py-5 text-sm text-center text-gray-600">
        Copyright 2025 © forever.com – All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
