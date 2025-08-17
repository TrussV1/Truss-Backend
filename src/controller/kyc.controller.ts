import { Request, Response } from "express";
import { verifyKYC } from "../service/kyc.service";
import User from "../model/user";

export const kycVerificationController = async (req: Request, res: Response) => {
  try {
    const { attestationId, proof, publicSignals, userContextData, walletAddress } = req.body;
    const result = await verifyKYC({ attestationId, proof, publicSignals, userContextData });
    if (!result) {
      return res.status(404).json({ msg: "No record found", type: "NOT_EXIST", code: 404 });
    }
    // Update user KYC status
    await User.findOneAndUpdate(
      { walletAddress },
      { kycVerified: true, kycDetails: result.details }
    );

    res.status(200).json({
      status: "success",
      result: true,
      credentialSubject: result.details,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      result: false,
      message: error.message || "Verification failed",
    });
  }
};