import express from "express";
import { kycVerificationController } from "../controller/kyc.controller";
const router = express.Router();

router.post("/verify", kycVerificationController);

export default router;