import type { CreateGrocery, Grocery } from "$lib/models/groceries";
import {
  createStoreItem,
  deleteStoreItem,
  STORE_MAP,
  updateStoreItem,
} from ".";

const { store } = STORE_MAP.groceries;

export const groceries = {
  store,
  set: store.set,
  subscribe: store.subscribe,
  create: (grocery: CreateGrocery) =>
    createStoreItem(
      "groceries",
      grocery,
      { toast: ["suc"] },
    ),

  update: (grocery_id: string, grocery: Partial<Grocery>) =>
    updateStoreItem(
      "groceries",
      grocery_id,
      grocery,
      { toast: ["suc"] },
    ),

  delete: (grocery_id: string) =>
    deleteStoreItem(
      "groceries",
      grocery_id,
      { toast: ["suc"] },
    ),
};
