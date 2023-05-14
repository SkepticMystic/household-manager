import { getUser } from "$lib/auth/server";
import { Parsers } from "$lib/schema/parsers";
import { _idToString, suc } from "$lib/utils";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { Chores, choreSchema } from "$lib/models/chores";

export const PUT: RequestHandler = async ({ locals, request, params }) => {
  const [{ team_id }, input] = await Promise.all([
    getUser(locals),
    Parsers.request(
      request,
      choreSchema.partial(),
    ),
  ]);

  const { chore_id } = params;

  const grocery = await Chores.findOneAndUpdate(
    { _id: chore_id, team_id },
    input,
    { new: true },
  );

  if (!grocery) {
    throw error(404, "Chore not found");
  }

  return json(suc(_idToString(grocery)));
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const { team_id } = await getUser(locals);

  const del = await Chores.deleteOne({
    _id: params.chore_id,
    team_id,
  });

  if (!del.deletedCount) {
    throw error(404, "Chore not found");
  }

  return json(suc());
};
