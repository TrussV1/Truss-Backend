
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  kycVerified: { type: Boolean, default: false },
  kycDetails: { type: mongoose.Schema.Types.Mixed, default: null }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;