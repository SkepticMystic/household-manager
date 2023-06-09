import type { Chore, CreateChore } from "$lib/models/chores";
import {
  createStoreItem,
  deleteStoreItem,
  type ModifyStoreItemOptions,
  STORE_MAP,
  updateStoreItem,
} from ".";

const { store } = STORE_MAP.chores;

export const chores = {
  store,
  subscribe: store.subscribe,
  set: store.set,

  create: (chore: CreateChore, opts?: ModifyStoreItemOptions) =>
    createStoreItem(
      "chores",
      chore,
      opts,
    ),

  update: (
    chore_id: string,
    chore: Partial<Chore>,
    opts?: ModifyStoreItemOptions,
  ) =>
    updateStoreItem(
      "chores",
      chore_id,
      chore,
      opts,
    ),

  delete: (chore_id: string, opts?: ModifyStoreItemOptions) =>
    deleteStoreItem(
      "chores",
      chore_id,
      opts,
    ),
};
