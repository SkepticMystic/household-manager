import type { BudgetItem, CreateBudgetItem } from "$lib/models/budgetItems";
import {
  createStoreItem,
  deleteStoreItem,
  type ModifyStoreItemOptions,
  STORE_MAP,
  updateStoreItem,
} from ".";

const { store } = STORE_MAP.budgetItems;

export const budgetItems = {
  store,
  subscribe: store.subscribe,
  set: store.set,

  create: (budgetItem: CreateBudgetItem, opts?: ModifyStoreItemOptions) =>
    createStoreItem(
      "budgetItems",
      budgetItem,
      opts,
    ),

  update: (
    budgetItem_id: string,
    budgetItem: Partial<BudgetItem>,
    opts?: ModifyStoreItemOptions,
  ) =>
    updateStoreItem(
      "budgetItems",
      budgetItem_id,
      budgetItem,
      opts,
    ),

  delete: (budgetItem_id: string, opts?: ModifyStoreItemOptions) =>
    deleteStoreItem(
      "budgetItems",
      budgetItem_id,
      opts,
    ),
};
