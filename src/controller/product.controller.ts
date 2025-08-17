import { Response } from "express";
import cloudinary from "../utils/cloudinary";
import { upload } from "../middleware/upload.middleware";
import { AuthRequest } from "../middleware/auth.middleware"; //  import the type
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../service/product.service";

// Utility function for Cloudinary upload
const uploadToCloudinary = (fileBuffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

// Upload + create product
export const uploadProductImageAndCreate = [
  upload.single("image"),
  async (req: AuthRequest & { file?: Express.Multer.File }, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          msg: "No image file uploaded",
          type: "FAILED",
          code: 400,
        });
      }

      const result = await uploadToCloudinary(req.file.buffer);

      // ✅ attach owner from JWT
      const productData = {
        ...req.body,
        image: [result.secure_url],
        owner: req.user?.id,
      };

      const product = await createProduct(productData);
      if (!product) {
        return res.status(400).json({
          msg: "Failed to create product",
          type: "FAILED",
          code: 400,
        });
      }

      res.status(201).json({ msg: product, type: "SUCCESS", code: 201 });
    } catch (error: any) {
      res.status(500).json({ msg: error.message, type: "FAILED", code: 500 });
    }
  },
];

// Create product (without image upload)
export const createProductController = async (req: AuthRequest, res: Response) => {
  try {
    // ✅ owner comes from token
    const product = await createProduct({
      ...req.body,
      owner: req.user?.id,
    });

    if (!product) {
      return res.status(400).json({
        msg: "Failed to create product",
        type: "FAILED",
        code: 400,
      });
    }

    res.status(201).json({
      msg: "Product created successfully",
      product,
      type: "SUCCESS",
      code: 201,
    });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, type: "FAILED", code: 500 });
  }
};

// ✅ Fetch all products
export const getAllProductsController = async (req: AuthRequest, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({ products, type: "SUCCESS", code: 200 });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, type: "FAILED", code: 500 });
  }
};

// ✅ Fetch product by ID
export const getProductByIdController = async (req: AuthRequest, res: Response) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found", type: "NOT_EXIST", code: 404 });
    }
    res.status(200).json({ product, type: "SUCCESS", code: 200 });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, type: "FAILED", code: 500 });
  }
};

// Update product by ID (only owner or admin)
export const updateProductController = async (req: AuthRequest, res: Response) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found", type: "NOT_EXIST", code: 404 });
    }

    // ✅ Ownership or admin check
    if (product.owner.toString() !== req.user!.id && req.user!.role !== "admin") {
      return res.status(403).json({ msg: "Not authorized", type: "FORBIDDEN", code: 403 });
    }

    const updated = await updateProductById(req.params.id, req.body);
    res.status(200).json({ msg: updated, type: "SUCCESS", code: 200 });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, type: "FAILED", code: 500 });
  }
};

// Delete product by ID (only owner or admin)
export const deleteProductController = async (req: AuthRequest, res: Response) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found", type: "NOT_EXIST", code: 404 });
    }

    // ✅ Ownership or admin check
    if (product.owner.toString() !== req.user!.id && req.user!.role !== "admin") {
      return res.status(403).json({ msg: "Not authorized", type: "FORBIDDEN", code: 403 });
    }

    const deleted = await deleteProductById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Product not found or already deleted", type: "NOT_EXIST", code: 404 });
    }
    res.status(200).json({
      msg: `Product with id:${deleted._id} has been deleted`,
      type: "SUCCESS",
      code: 200,
    });
  } catch (error: any) {
    res.status(500).json({ msg: error.message, type: "FAILED", code: 500 });
  }
};
