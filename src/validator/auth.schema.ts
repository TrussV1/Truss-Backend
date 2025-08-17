import Joi from "joi";

export const loginSchema = Joi.object({
  address: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/) // Ethereum wallet address format
    .required()
    .messages({
      "string.empty": "Wallet address is required",
      "string.pattern.base": "Invalid wallet address format",
    }),
});
export const registerSchema = Joi.object({
  walletAddress: Joi.string()
    .pattern(/^0x[a-fA-F0-9]{40}$/) // Ethereum wallet address format
    .required()
    .messages({
      "string.empty": "Wallet address is required",
      "string.pattern.base": "Invalid wallet address format",
    }),
  kycVerified: Joi.boolean().default(false),
  kycDetails: Joi.object().optional(),
});