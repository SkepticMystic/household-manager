import { getUser } from "$lib/auth/server";
import { BudgetItems, budgetItemSchema } from "$lib/models/budgetItems";
import { Parsers } from "$lib/schema/parsers";
import { _idToString, suc } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, request }) => {
  const [{ userId, team_id }, input] = await Promise.all([
    getUser(locals),
    Parsers.request(request, budgetItemSchema),
  ]);

  const budgetItem = await BudgetItems.create({
    ...input,
    team_id,
    createdBy: userId,
  });

  return json(suc(_idToString(budgetItem)));
};
