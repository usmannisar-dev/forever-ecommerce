import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontendAssets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="px-4 md:px-10">
      {/* ABOUT US */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* IMAGE + TEXT */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About Section"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever is an online shopping platform created with a simple idea —
            to make stylish, quality products affordable and accessible for
            everyone. We believe fashion and lifestyle products should not be
            complicated or overpriced. That’s why Forever focuses on carefully
            selected items that combine comfort, quality, and modern design.
          </p>
          <p>
            Our website is built to give customers a smooth and easy shopping
            experience, whether you are buying for men, women, or kids. From
            everyday wear to trendy pieces, we aim to offer products that fit
            your lifestyle and budget.
          </p>
          <p>
            At Forever, customer satisfaction comes first. We provide clear
            product details, secure payment options, and reliable delivery
            services, including Cash on Delivery. Every product we list is
            chosen with care so our customers can shop with confidence.
          </p>

          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            Our mission at Forever is to provide high-quality, affordable
            products while delivering a seamless and trustworthy online shopping
            experience. We aim to make fashion and everyday essentials
            accessible to everyone, without compromising on style or comfort.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        {/* CARD 1 */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4">
          <b>✅ Quality Assurance:</b>
          <p className="text-gray-600">
            We ensure every product meets high standards of quality, durability,
            and customer satisfaction before delivery.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4">
          <b>🛒 Convenience:</b>
          <p className="text-gray-600">
            Shop easily anytime with a smooth website experience, secure
            payments, and fast, reliable delivery options.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4">
          <b>💬 Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our support team is always ready to help, ensuring quick responses
            and complete customer satisfaction.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
