import type { CreateGrocery, Grocery } from "$lib/models/groceries";
import {
  createStoreItem,
  deleteStoreItem,
  type ModifyStoreItemOptions,
  STORE_MAP,
  updateStoreItem,
} from ".";

const { store } = STORE_MAP.groceries;

export const groceries = {
  store,
  set: store.set,
  subscribe: store.subscribe,
  create: (grocery: CreateGrocery, opts?: ModifyStoreItemOptions) =>
    createStoreItem(
      "groceries",
      grocery,
      opts,
    ),

  update: (
    grocery_id: string,
    grocery: Partial<Grocery>,
    opts?: ModifyStoreItemOptions,
  ) =>
    updateStoreItem(
      "groceries",
      grocery_id,
      grocery,
      opts,
    ),

  delete: (grocery_id: string, opts?: ModifyStoreItemOptions) =>
    deleteStoreItem(
      "groceries",
      grocery_id,
      opts,
    ),
};
