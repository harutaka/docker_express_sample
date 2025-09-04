import { Router, type Router as RouterType } from "express";

const router: RouterType = Router();

import * as base from "../handlers/base.js";

router.get("/health", base.getHealth);
router.get("/readiness", base.getReadiness);
router.get("/date", base.getDate);
router.get("/score", base.getScore);
router.put("/score", base.putScore);

export default router;
