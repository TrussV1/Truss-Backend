import ProductModel, { ProductType } from "../model/product";

// Create
export const createProduct = async (data: Partial<ProductType>) => {
  return await ProductModel.create(data);
};

// Get all
export const getAllProducts = async () => {
  return await ProductModel.find().sort({ createdAt: -1 });
};

// Get by ID
export const getProductById = async (id: string) => {
  return await ProductModel.findById(id);
};

// Update
export const updateProductById = async (id: string, data: Partial<ProductType>) => {
  return await ProductModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete
export const deleteProductById = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};
