import express, { Request, Response, NextFunction } from "express";
import { APISuccess } from "../utils";

const router = express.Router();

router.get("/", (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      msg: "Initiate Complete",
    };

    const response = new APISuccess(data);
    res.json(response.jsonify());
  } catch (error) {
    next(error);
  }
});

export default router;
