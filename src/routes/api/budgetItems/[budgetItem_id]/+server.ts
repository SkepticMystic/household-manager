import { getUser } from "$lib/auth/server";
import { Parsers } from "$lib/schema/parsers";
import { _idToString, suc } from "$lib/utils";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { BudgetItems, budgetItemSchema } from "$lib/models/budgetItems";

export const PUT: RequestHandler = async ({ locals, request, params }) => {
  const [{ team_id }, input] = await Promise.all([
    getUser(locals),
    Parsers.request(
      request,
      budgetItemSchema.partial(),
    ),
  ]);

  const { budgetItem_id } = params;

  const budgetItem = await BudgetItems.findOneAndUpdate(
    { _id: budgetItem_id, team_id },
    input,
    { new: true },
  );

  if (!budgetItem) {
    throw error(404, "Budget item not found");
  }

  return json(suc(_idToString(budgetItem)));
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const { team_id } = await getUser(locals);

  const del = await BudgetItems.deleteOne({
    _id: params.budgetItem_id,
    team_id,
  });

  if (!del.deletedCount) {
    throw error(404, "Budget item not found");
  }

  return json(suc());
};
