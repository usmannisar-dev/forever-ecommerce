import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // Read the uploaded files
    const files = [
      req?.files?.image1?.[0],
      req?.files?.image2?.[0],
      req?.files?.image3?.[0],
      req?.files?.image4?.[0],
    ].filter(Boolean); // remove undefined

    // Upload to Cloudinary
    const imageURLs = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url; // Cloudinary URL
      })
    );

    // Sizes must be array
    const sizesArray = typeof sizes === "string" ? JSON.parse(sizes) : sizes;

    // Create product
    const productData = new productModel({
      name,
      description,
      price,
      category,
      subCategory,
      sizes: sizesArray,
      bestSeller: bestSeller === "true" || bestSeller === true,
      image: imageURLs, // save cloudinary URLs
      date: Date.now(),
    });

    // Save product
    const savedProduct = await productData.save();

    return res.json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// LIST PRODUCTS
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.json({ success: true, products });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// REMOVE PRODUCT
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// SINGLE PRODUCT
const singleProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await productModel.findById(id);

    return res.json({ success: true, product });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
