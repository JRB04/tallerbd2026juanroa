import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router();
const productController = new ProductController();

router.post("/", productController.create);
router.get("/", productController.findAll);
router.get("/:id", productController.findById);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

export default router;