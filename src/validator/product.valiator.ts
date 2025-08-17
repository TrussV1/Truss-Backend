import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
    image: z.array(z.string().url("Image must be a valid URL")),
    owner: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid owner ID"),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(5).optional(),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
    image: z.array(z.string().url()).optional(),
  }),
});
