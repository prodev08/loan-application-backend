import express from "express";
import initiateRouter from "./initiate";
import balanceRouter from "./ballances";
import submitRouter from "./submit";

const router = express.Router();

router.use("/initiate", initiateRouter);
router.use("/balances", balanceRouter);
router.use("/submit", submitRouter);

export default router;
