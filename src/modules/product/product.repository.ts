import { getDb } from "../../config/database";
import { Product } from "./product.model";
import { Collection, ObjectId } from "mongodb";

export class ProductRepository {

    private collection(): Collection<Product> {
        return getDb().collection<Product>("product");
    }

    async create(data: Omit<Product, "_id">): Promise<Product> {
        const result = await this.collection().insertOne(data as Product);
        return { _id: result.insertedId, ...data };
    }

    async findAll(): Promise<Product[]> {
        return this.collection().find().sort({ createdAt: -1 }).toArray();
    }

    async findById(id: ObjectId): Promise<Product | null> {
        return this.collection().findOne({ _id: id });
    }

    async update(id: ObjectId, changes: Partial<Product>): Promise<Product | null> {
        const result = await this.collection().findOneAndUpdate(
            { _id: id },
            { $set: changes },
            { returnDocument: "after" }
        );
        return result ?? null;
    }

    async delete(id: ObjectId): Promise<boolean> {
        const result = await this.collection().deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
}