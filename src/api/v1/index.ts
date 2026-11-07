import { Router } from "express";
import demoRoutes from "../../modules/demo/demo.routes";
import productRoutes from "../../modules/product/product.routes";

const router = Router();

router.use("/demo", demoRoutes);

// Forzamos la entrada limpia para Express v5
router.use("/product", productRoutes);

export default router;