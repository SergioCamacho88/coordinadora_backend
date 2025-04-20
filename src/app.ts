import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import orderRoutes from "./modules/orders/orders.routes";
import rutaRoutes from "./routes/ruta.routes";
import transportistaRoutes from "./routes/transportista.routes";
import debugRoutes from "./routes/debug.routes";
import reportRoutes from "./routes/report.routes";
import protectedRoutes from "./routes/protected.routes";
import transportistasRoutes from "./modules/transportistas/transportistas.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swaggerConfig";

import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", rutaRoutes);
app.use("/api", transportistaRoutes);
app.use("/api", debugRoutes);
app.use("/api", reportRoutes);
app.use("/api", protectedRoutes);
app.use("/api/transportistas", transportistasRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
