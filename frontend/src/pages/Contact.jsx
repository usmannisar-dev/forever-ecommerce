import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontendAssets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div className="px-4 md:px-10">
      {/* TITLE */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* IMAGE + TEXT SECTION */}
      <div className="my-10 flex flex-col md:flex-row gap-14 mb-28 items-center">
        {/* IMAGE */}
        <img
          className="w-full md:max-w-[480px] rounded-lg"
          src={assets.contact_img}
          alt="Contact Section"
        />

        {/* TEXT CONTENT */}
        <div className="flex flex-col justify-center items-start gap-6 text-gray-600">
          <p className="font-semibold text-xl text-gray-800">
            Our Store
          </p>

          <p>
            📍 House no 154, E-block, Pak Arab Housing Society, Lahore.
          </p>

          <p>
            <b>Tel:</b> +92 324 436 6243 <br />
            <b>Email:</b> uchohan804@gmail.com
          </p>

          <p className="font-semibold text-xl text-gray-800">
            Careers at Forever
          </p>

          <p>
            🚀 Join Forever and grow with us. We’re always looking for passionate,
            creative, and motivated individuals to build a trusted and innovative
            eCommerce brand together.
          </p>

          <button className="border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* NEWSLETTER */}
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
