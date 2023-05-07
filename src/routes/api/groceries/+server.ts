import { getUser } from "$lib/auth/server";
import { createGrocerySchema, Groceries } from "$lib/models/groceries";
import { Parsers } from "$lib/schema/parsers";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { _idToString, suc } from "$lib/utils";

export const POST: RequestHandler = async ({ locals, request }) => {
  const [{ userId, team_id }, input] = await Promise.all([
    getUser(locals),
    Parsers.request(request, createGrocerySchema),
  ]);

  const grocery = await Groceries.create({
    ...input,
    team_id,
    createdBy: userId,
  });

  return json(suc(_idToString(grocery)));
};
