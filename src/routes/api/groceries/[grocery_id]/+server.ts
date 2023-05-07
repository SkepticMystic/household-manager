import { getUser } from "$lib/auth/server";
import { createGrocerySchema, Groceries } from "$lib/models/groceries";
import { Parsers } from "$lib/schema/parsers";
import { _idToString, suc } from "$lib/utils";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const PUT: RequestHandler = async ({ locals, request, params }) => {
  const [{ team_id }, input] = await Promise.all([
    getUser(locals),
    Parsers.request(
      request,
      createGrocerySchema,
    ),
  ]);

  const { grocery_id } = params;

  const grocery = await Groceries.findOneAndUpdate(
    { _id: grocery_id, team_id },
    input,
    { new: true },
  );

  if (!grocery) {
    throw error(404, "Grocery not found");
  }

  return json(suc(_idToString(grocery)));
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const { team_id } = await getUser(locals);

  const del = await Groceries.deleteOne({
    _id: params.grocery_id,
    team_id,
  });

  if (!del.deletedCount) {
    throw error(404, "Grocery not found");
  }

  return json(suc());
};
