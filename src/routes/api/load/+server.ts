import { Users } from "$lib/auth/lucia";
import { getUser } from "$lib/auth/server";
import { Chores } from "$lib/models/chores";
import { Groceries } from "$lib/models/groceries";
import { _idToString } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { BudgetItems } from "$lib/models/budgetItems";

export const GET: RequestHandler = async ({ locals }) => {
  const { team_id } = await getUser(locals);

  const [groceries, chores, budgetItems, teamMembers] = await Promise.all([
    Groceries.find(
      { team_id },
      { name: 1, quantity: 1, price: 1, purchasedAt: 1, purchasedBy: 1 },
    ).lean(),

    Chores.find(
      { team_id },
      { team_id: 0 },
    ).lean(),

    BudgetItems.find(
      { team_id },
      { team_id: 0 },
    ),

    Users.find(
      { team_id },
      { _id: 1, email: 1 },
    ).lean(),
  ]);

  return json({
    groceries: groceries.map(_idToString),
    chores: chores.map(_idToString),
    budgetItems: budgetItems.map(_idToString),
    teamMembers,
  });
};
