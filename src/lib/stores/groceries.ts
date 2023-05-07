import type { Result, SID } from "$lib/interfaces";
import type { CreateGrocery, Grocery } from "$lib/models/groceries";
import axios from "axios";
import { writable } from "svelte/store";
import { addToast } from "./toast";
import { err } from "$lib/utils";
import { getHTTPErrorMsg } from "$lib/utils/errors";

export const groceries = writable<SID<Grocery>[]>([]);

interface Opts {
  toast?: ("err" | "suc")[];
}

const DEFAULT_OPTS: Required<Opts> = {
  toast: ["err", "suc"],
};

export const createGrocery = async (
  grocery: CreateGrocery,
  opts?: Opts,
) => {
  const { toast } = Object.assign({ ...DEFAULT_OPTS }, opts ?? {});

  try {
    const { data } = await axios.post<Result<SID<Grocery>, string>>(
      "/api/groceries",
      grocery,
    );

    if (data.ok) {
      groceries.update((old) => [data.data, ...old]);

      if (toast.includes("suc")) {
        addToast({
          type: "success",
          message: "Grocery created!",
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

export const updateGrocery = async (
  grocery_id: string,
  grocery: Grocery,
  opts?: Opts,
) => {
  const { toast } = Object.assign({ ...DEFAULT_OPTS }, opts ?? {});
  try {
    const { data } = await axios.put<Result<SID<Grocery>, string>>(
      `/api/groceries/${grocery_id}`,
      grocery,
    );

    if (data.ok) {
      groceries.update((old) =>
        old.map((g) => (g._id === grocery_id ? data.data : g))
      );

      if (toast.includes("suc")) {
        addToast({
          type: "success",
          message: "Grocery updated!",
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

export const deleteGrocery = async (
  grocery_id: string,
  opts?: Opts,
) => {
  if (!confirm("Are you sure you want to delete this grocery?")) return;

  const { toast } = Object.assign({ ...DEFAULT_OPTS }, opts ?? {});
  try {
    const { data } = await axios.delete<Result<undefined, string>>(
      `/api/groceries/${grocery_id}`,
    );

    if (data.ok) {
      groceries.update((old) => old.filter((g) => g._id !== grocery_id));

      if (toast.includes("suc")) {
        addToast({
          type: "success",
          message: "Grocery updated!",
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
