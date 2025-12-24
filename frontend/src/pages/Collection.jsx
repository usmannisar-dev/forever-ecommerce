import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontendAssets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, SetShowFilter] = useState(false);
  const [filterProducts, SetFilterProducts] = useState([]);
  const [category, SetCategory] = useState([]);
  const [subCategory, SetSubCategory] = useState([]);
  const [sortType, SetSortType] = useState("relavent");

  // Toggle category
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      SetCategory((prev) => prev.filter((item) => item !== value));
    } else {
      SetCategory((prev) => [...prev, value]);
    }
  };

  // Toggle sub-category
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      SetSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      SetSubCategory((prev) => [...prev, value]);
    }
  };

  // Apply Filter
  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    SetFilterProducts(productsCopy);
  };

  // SORT FUNCTION FIXED
  const sortProducts = () => {
    let fpCopy = [...filterProducts];

    if (sortType === "low-high") {
      fpCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      fpCopy.sort((a, b) => b.price - a.price);
    } else {
      // relevant → just apply filter again
      applyFilter();
      return;
    }

    SetFilterProducts(fpCopy);
  };

  // Run filter when category/subCategory change
  useEffect(() => {
    if (products) {
      applyFilter();
    }
  }, [category, subCategory, products, search, showSearch, products]);

  // Run sort when sortType changes
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* FILTER COLUMN */}
      <div className="min-w-60">
        <div
          className="my-2 text-xl cursor-pointer flex items-center gap-2 sm:hidden"
          onClick={() => SetShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown"
            className={`h-3 transition-all ${showFilter ? "rotate-90" : ""}`}
          />
        </div>

        {/* CATEGORY FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                value="Men"
                onChange={toggleCategory}
                className="w-3"
              />
              Men
            </label>
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                value="Women"
                onChange={toggleCategory}
                className="w-3"
              />
              Women
            </label>
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                value="Kids"
                onChange={toggleCategory}
                className="w-3"
              />
              Kids
            </label>
          </div>
        </div>

        {/* SUB-CATEGORY FILTER */}
        <div
          className={`border px-4 border-gray-300 pl-5 py-3 mt-6 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                value="Topwear"
                onChange={toggleSubCategory}
                className="w-3"
              />
              Topwear
            </label>
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                value="Bottomwear"
                onChange={toggleSubCategory}
                className="w-3"
              />
              Bottomwear
            </label>
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                value="Winterwear"
                onChange={toggleSubCategory}
                className="w-3"
              />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* PRODUCTS AREA */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTION" />

          <select
            onChange={(e) => SetSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
