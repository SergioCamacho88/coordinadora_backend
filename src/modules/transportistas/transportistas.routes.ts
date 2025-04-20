import { Router } from "express";
import { getEnabledTransportistas } from "./transportistas.controller";

const router = Router();

router.get("/available", getEnabledTransportistas);

export default router;
