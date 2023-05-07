import { getUser } from "$lib/auth/server";
import { Groceries } from "$lib/models/groceries";
import { _idToString } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  const { team_id } = await getUser(locals);

  const [groceries] = await Promise.all([
    Groceries.find(
      { team_id },
      { name: 1, quantity: 1, price: 1, purchasedAt: 1, purchasedBy: 1 },
    ).lean(),
  ]);

  return json({
    groceries: groceries.map(_idToString),
  });
};
