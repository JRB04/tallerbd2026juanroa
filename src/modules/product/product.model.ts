import { ObjectId } from "mongodb";

export interface Product {
    _id?: ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductDTO {
    name?: string;
}