import express from "express";
import { validateRequest } from "../middlewares/validator";
import { requestSubmitSchema } from "../validateSchema/submit";
import { submit } from "../controllers/submit";
import { rateLimiter } from "../utils";

const router = express.Router();

router.put("/", rateLimiter, validateRequest(requestSubmitSchema), submit);

export default router;
