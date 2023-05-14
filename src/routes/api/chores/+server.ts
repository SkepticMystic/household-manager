import { getUser } from "$lib/auth/server";
import { Parsers } from "$lib/schema/parsers";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { _idToString, suc } from "$lib/utils";
import { Chores, choreSchema } from "$lib/models/chores";

export const POST: RequestHandler = async ({ locals, request }) => {
  const [{ userId, team_id }, input] = await Promise.all([
    getUser(locals),
    Parsers.request(request, choreSchema),
  ]);

  const grocery = await Chores.create({
    ...input,
    team_id,
    createdBy: userId,
  });

  return json(suc(_idToString(grocery)));
};
