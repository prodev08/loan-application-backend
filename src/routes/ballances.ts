import express from "express";
import { validateRequest } from "../middlewares/validator";
import { requestBalanceSchema } from "../validateSchema/balances";
import { getBalances } from "../controllers/balances";
import { rateLimiter } from "../utils";

const router = express.Router();

router.post(
  "/",
  rateLimiter,
  validateRequest(requestBalanceSchema),
  getBalances
);

export default router;
