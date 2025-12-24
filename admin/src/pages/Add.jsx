import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, SetImage1] = useState(false);
  const [image2, SetImage2] = useState(false);
  const [image3, SetImage3] = useState(false);
  const [image4, SetImage4] = useState(false);

  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [price, SetPrice] = useState("");
  const [category, SetCategory] = useState("Men");
  const [subCategory, SetSubCategory] = useState("Topwear");
  const [bestSeller, SetBestSeller] = useState(false);
  const [sizes, SetSizes] = useState([]);
  const [loading, SetLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      SetLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        SetName("");
        SetDescription("");
        SetPrice("");
        SetImage1(false);
        SetImage2(false);
        SetImage3(false);
        SetImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      SetLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
          <div className="flex space-x-3">
            <div
              className="w-6 h-6 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-6 h-6 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.15s" }}
            ></div>
            <div
              className="w-6 h-6 bg-yellow-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="w-6 h-6 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.45s" }}
            ></div>
            <div
              className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>
          <p className="mt-4 text-white text-xl font-bold">Uploading...</p>
        </div>
      )}

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full items-start gap-3"
      >
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20"
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt=""
              />
              <input
                onChange={(e) => SetImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20"
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt=""
              />
              <input
                onChange={(e) => SetImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20"
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt=""
              />
              <input
                onChange={(e) => SetImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20"
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt=""
              />
              <input
                onChange={(e) => SetImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            onChange={(e) => SetName(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Type here"
            required
            value={name}
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            onChange={(e) => SetDescription(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Write content here"
            required
            value={description}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              onChange={(e) => SetCategory(e.target.value)}
              className="w-full px-3 py-2"
              value={category}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product Sub Category</p>
            <select
              onChange={(e) => SetSubCategory(e.target.value)}
              className="w-full px-3 py-2"
              value={subCategory}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e) => SetPrice(e.target.value)}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="25"
              value={price}
            />
          </div>
        </div>

        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            <div
              onClick={() =>
                SetSizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                S
              </p>
            </div>
            <div
              onClick={() =>
                SetSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                M
              </p>
            </div>
            <div
              onClick={() =>
                SetSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                L
              </p>
            </div>
            <div
              onClick={() =>
                SetSizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XL
              </p>
            </div>
            <div
              onClick={() =>
                SetSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <input
            onChange={() => SetBestSeller((prev) => !prev)}
            checked={bestSeller}
            type="checkbox"
            id="bestSeller"
          />
          <label className="cursor-pointer" htmlFor="bestSeller">
            Add to bestSeller
          </label>
        </div>

        <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
          ADD Product
        </button>
      </form>
    </>
  );
};

export default Add;
