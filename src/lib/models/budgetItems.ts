import { BUDGET_ITEM_CONST } from "$lib/const/budgets";
import type { OID } from "$lib/interfaces";
import mongoose from "mongoose";
import { z } from "zod";

export const budgetItemSchema = z.object({
  category: z.enum(BUDGET_ITEM_CONST.CATEGORIES),

  name: z.string(),
  description: z.string().optional(),

  amount: z.number(),
  frequency_days: z.number(),

  attributedTo: z.string().optional(),
});

export type CreateBudgetItem = z.infer<typeof budgetItemSchema>;

export type BudgetItem = CreateBudgetItem & {
  team_id: string;
  createdBy: string;
};

export type DatabaseBudgetItem = BudgetItem & {
  createdAt: Date;
  updatedAt: Date;
};

const modelName = "BudgetItems";
export const BudgetItems = mongoose.model<OID<DatabaseBudgetItem>>(
  modelName,
  new mongoose.Schema({
    team_id: {
      type: String,
      ref: "Teams",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },

    amount: {
      type: Number,
      required: true,
    },
    frequency_days: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: BUDGET_ITEM_CONST.CATEGORIES,
    },
    attributedTo: {
      type: String,
      required: false,
      ref: "auth_user",
    },

    createdBy: {
      type: String,
      ref: "auth_user",
      required: true,
    },
  }, { timestamps: true }),
  modelName,
);
