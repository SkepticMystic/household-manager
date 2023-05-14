import { ONE_DAY_MS } from "$lib/const";
import type { DatabaseChore } from "$lib/models/chores";

export const getChoreNextDueDate = (
  chore: Pick<
    DatabaseChore,
    "createdAt" | "frequency_days" | "lastCompletedAt"
  >,
) => {
  const { frequency_days, lastCompletedAt, createdAt } = chore;
  const frequency_ms = frequency_days * ONE_DAY_MS;

  return lastCompletedAt
    ? new Date(
      new Date(lastCompletedAt).getTime() + frequency_ms,
    )
    : new Date(
      new Date(createdAt).getTime() + frequency_ms,
    );
};

export const getChoreNextDueFraction = (
  nextDue: Date,
  frequency_days: number,
) => 1 - (nextDue.getTime() - Date.now()) / (ONE_DAY_MS * frequency_days);
