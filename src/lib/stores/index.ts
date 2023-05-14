import type { Result, SID } from "$lib/interfaces";
import type { CreateChore, DatabaseChore } from "$lib/models/chores";
import type { CreateGrocery, Grocery } from "$lib/models/groceries";
import { err } from "$lib/utils";
import { getHTTPErrorMsg } from "$lib/utils/errors";
import axios from "axios";
import { type Writable, writable } from "svelte/store";

import { addToast } from "./toast";

const resources = ["groceries", "chores"] as const;
type Resource = typeof resources[number];

export const STORE_MAP = {
  groceries: {
    store: writable<SID<Grocery>[]>([]),
    singular: "Grocery",
  },
  chores: {
    store: writable<SID<DatabaseChore>[]>([]),
    singular: "Chore",
  },
} satisfies Record<
  Resource,
  { store: Writable<any>; singular: string }
>;

interface StoreItems {
  groceries: {
    create: CreateGrocery;
    return: Grocery;
  };
  chores: {
    create: CreateChore;
    return: DatabaseChore;
  };
}

export type ModifyStoreItemOptions = {
  toast?: ("err" | "suc")[];
};

const DEFAULT_OPTS: Required<ModifyStoreItemOptions> = {
  toast: ["err", "suc"],
};

export const createStoreItem = async <T extends Resource>(
  resource: T,
  item: StoreItems[T]["create"],
  opts?: ModifyStoreItemOptions,
) => {
  const { store, singular } = STORE_MAP[resource];
  const { toast } = Object.assign({ ...DEFAULT_OPTS }, opts ?? {});

  try {
    const { data } = await axios.post<
      Result<
        SID<StoreItems[T]["return"]>,
        string
      >
    >(
      "/api/" + resource,
      item,
    );

    if (data.ok) {
      store.update((old) => [data.data, ...old]);

      if (toast.includes("suc")) {
        addToast({
          type: "success",
          message: `${singular} created!`,
          duration_ms: 3_000,
        });
      }
    } else {
      if (toast.includes("err")) {
        addToast({
          type: "error",
          message: data.error,
        });
      }
    }

    return data;
  } catch (error) {
    const message = getHTTPErrorMsg(error);
    if (toast.includes("err")) {
      addToast({
        type: "error",
        message,
      });
    }

    return err(message);
  }
};

export const updateStoreItem = async <T extends Resource>(
  resource: T,
  item_id: string,
  item: Partial<StoreItems[T]["create"]>,
  opts?: ModifyStoreItemOptions,
) => {
  const { store, singular } = STORE_MAP[resource];
  const { toast } = Object.assign({ ...DEFAULT_OPTS }, opts ?? {});

  try {
    const { data } = await axios.put<Result<SID<Grocery>, string>>(
      `/api/${resource}/${item_id}`,
      item,
    );

    if (data.ok) {
      store.update((old) =>
        old.map((r) => (r._id === item_id ? data.data : r))
      );

      if (toast.includes("suc")) {
        addToast({
          type: "success",
          message: `${singular} updated!`,
          duration_ms: 3_000,
        });
      }
    } else {
      if (toast.includes("err")) {
        addToast({
          type: "error",
          message: data.error,
        });
      }
    }

    return data;
  } catch (error) {
    const message = getHTTPErrorMsg(error);
    if (toast.includes("err")) {
      addToast({
        type: "error",
        message,
      });
    }

    return err(message);
  }
};

export const deleteStoreItem = async (
  resource: Resource,
  item_id: string,
  opts?: ModifyStoreItemOptions,
) => {
  const { singular, store } = STORE_MAP[resource];

  if (
    !confirm(`Are you sure you want to delete this ${singular.toLowerCase()}?`)
  ) return;

  const { toast } = Object.assign({ ...DEFAULT_OPTS }, opts ?? {});
  try {
    const { data } = await axios.delete<Result<undefined, string>>(
      `/api/${resource}/${item_id}`,
    );

    if (data.ok) {
      store.update((old) => old.filter((r) => r._id !== item_id));

      if (toast.includes("suc")) {
        addToast({
          type: "success",
          message: `${singular} updated!`,
        });
      }
    } else {
      if (toast.includes("err")) {
        addToast({
          type: "error",
          message: data.error,
        });
      }
    }

    return data;
  } catch (error) {
    const message = getHTTPErrorMsg(error);
    if (toast.includes("err")) {
      addToast({
        type: "error",
        message,
      });
    }

    return err(message);
  }
};
