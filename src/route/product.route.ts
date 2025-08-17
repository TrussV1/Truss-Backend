import { Router } from "express";
import {
  uploadProductImageAndCreate,
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controller/product.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Create product with image upload
router.post("/upload", authenticate, ...uploadProductImageAndCreate);

// Create product without image upload
router.post("/", authenticate, createProductController);

// Fetch all products
router.get("/", getAllProductsController);

// Fetch my products (only authenticated user’s)
// Fetch my products (only authenticated user’s)
// router.get("/my-products", authenticate, getMyProductsController);
// Fetch by ID
router.get("/:id", getProductByIdController);

// Update
router.put("/:id", authenticate, updateProductController);

// Delete
router.delete("/:id", authenticate, deleteProductController);

export default router;
