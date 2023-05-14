import { CHORES_CONST } from "$lib/const/chores";
import type { OID } from "$lib/interfaces";
import { toDateSchema } from "$lib/schema";
import mongoose from "mongoose";
import { z } from "zod";

export const choreSchema = z.object({
  area: z.enum(CHORES_CONST.AREAS),
  name: z.string().min(1, { message: "Name must be at least 1 character" }),

  frequency_days: z.number().min(1, { message: "Must be at least 1 day" }),
  lastCompletedAt: toDateSchema.optional(),
});

export type CreateChore = z.infer<typeof choreSchema>;

export type Chore = CreateChore & {
  team_id: string;
  createdBy: string;
};

export type DatabaseChore = Chore & {
  createdAt: Date;
  updatedAt: Date;
};

const modelName = "Chores";
export const Chores = mongoose.model<OID<DatabaseChore>>(
  modelName,
  new mongoose.Schema({
    team_id: {
      type: String,
      ref: "Teams",
      required: true,
    },
    createdBy: {
      type: String,
      ref: "auth_user",
      required: true,
    },
    area: {
      type: String,
      required: true,
      enum: CHORES_CONST.AREAS,
    },
    name: {
      type: String,
      required: true,
    },
    frequency_days: {
      type: Number,
      required: true,
    },
    lastCompletedAt: {
      type: Date,
      required: false,
    },
  }, { timestamps: true }),
  modelName,
);
