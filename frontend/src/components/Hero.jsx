import React from "react";
import { assets } from "../assets/frontendAssets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col items-start justify-center gap-4 py-10 sm:py-0 px-5">
        {/* Small line + text */}
        <div className="flex items-center gap-2 text-[#414141]">
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
        </div>

        {/* Heading */}
        <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-[#414141]">
          Latest Arrivals
        </h1>

        {/* Shop Now */}
        <div className="flex items-center gap-2 text-[#414141]">
          <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
          <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
        </div>
      </div>
      {/* Hero Right Side */}
      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />

    </div>
  );
};

export default Hero;
