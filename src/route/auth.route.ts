import { Router } from "express";
import { loginWallet } from "../controller/auth.controller";
import { validateBody } from "../middleware/validate.middleware";
import { loginSchema } from "../validator/auth.schema";
import authController from "../controller/auth.controller";

const router = Router();

router.post("/wallet-login", validateBody(loginSchema), loginWallet);

export default router;
