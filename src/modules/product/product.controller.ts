import { Request, Response } from "express";
import { ProductService } from "./product.service";

export class ProductController {

    private readonly productService = new ProductService();

    create = async (req: Request, res: Response): Promise<void> => {
        const product = await this.productService.create(req.body);
        res.status(201).json(product);
    };

    findAll = async (_req: Request, res: Response): Promise<void> => {
        const products = await this.productService.findAll();
        res.status(200).json(products);
    };

    findById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const product = await this.productService.findById(req.params.id);
        res.status(200).json(product);
    };

    update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const product = await this.productService.update(req.params.id, req.body);
        res.status(200).json(product);
    };

    delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        await this.productService.delete(req.params.id);
        res.status(204).send();
    };
}