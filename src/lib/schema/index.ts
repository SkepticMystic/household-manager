import { z } from "zod";

export const passwordSchema = z.string().min(4);

const datelike = z.union([z.number(), z.string(), z.date()]);
export const toDateSchema = datelike.pipe(z.coerce.date());
