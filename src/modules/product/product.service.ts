import { ObjectId } from "mongodb";
import { Product, ProductDTO } from "./product.model";
import { ProductRepository } from "./product.repository";
import { BadRequestError, NotFoundError } from "../../shared/errors/AppError";

export class ProductService {

    private readonly productRepository = new ProductRepository();

    async create(data: ProductDTO): Promise<Product> {
        const name = this.requireString(data?.name, "name");

        const now = new Date();
        return this.productRepository.create({
            name,
            createdAt: now,
            updatedAt: now,
        });
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    async findById(id: string): Promise<Product> {
        const product = await this.productRepository.findById(this.toObjectId(id));
        if (!product) {
            throw new NotFoundError("Registro no encontrado");
        }
        return product;
    }

    async update(id: string, data: ProductDTO): Promise<Product> {
        const objectId = this.toObjectId(id);
        const changes: Partial<Product> = {};

        if (data.name !== undefined) changes.name = this.requireString(data.name, "name");

        if (Object.keys(changes).length === 0) {
            throw new BadRequestError("No se enviaron campos para actualizar");
        }
        changes.updatedAt = new Date();

        const updated = await this.productRepository.update(objectId, changes);
        if (!updated) {
            throw new NotFoundError("Registro no encontrado");
        }
        return updated;
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.productRepository.delete(this.toObjectId(id));
        if (!deleted) {
            throw new NotFoundError("Registro no encontrado");
        }
    }

    private requireString(value: unknown, field: string): string {
        if (typeof value !== "string" || value.trim() === "") {
            throw new BadRequestError(`El campo '${field}' es obligatorio y debe ser un texto no vacío`);
        }
        return value.trim();
    }

    private toObjectId(id: string): ObjectId {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestError(`Identificador inválido: ${id}`);
        }
        return new ObjectId(id);
    }
}