import { Router } from "express"
const router = Router()
import * as base from "../handlers/base.js"

router.get("/health", base.getHealth)
router.get("/readiness", base.getReadiness)
router.get("/date", base.getDate)
router.get("/score", base.getScore)
router.put("/score", base.putScore)

export default router