import { toDateSchema } from "$lib/schema";
import mongoose, { Model } from "mongoose";
import { z } from "zod";

export const createGrocerySchema = z.object({
  name: z.string().min(1).max(100),
  quantity: z.number().min(1).max(100),
  price: z.number().min(1).optional(),

  purchasedAt: toDateSchema.nullable().optional(),
  purchasedBy: z.string().optional(),
});

export type CreateGrocery = z.infer<
  typeof createGrocerySchema
>;

export type Grocery = CreateGrocery & {
  team_id: string;
  createdBy: string;

  createdAt: Date;
  updatedAt: Date;
};

const modelName = "Groceries";
export const Groceries: Model<Grocery> = mongoose.models[modelName] ||
  mongoose.model<Grocery>(
    modelName,
    new mongoose.Schema(
      {
        team_id: {
          type: String,
          required: true,
          ref: "Teams",
        },
        createdBy: {
          type: String,
          required: true,
          ref: "auth_user",
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: false,
        },
        purchasedAt: {
          type: Date,
          required: false,
        },
        purchasedBy: {
          type: String,
          required: false,
        },
      },
      { timestamps: true },
    ),
    modelName,
  );
