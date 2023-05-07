import type { Grocery } from "$lib/models/groceries";
import { writable } from "svelte/store";

export const groceries = writable<Grocery[]>([]);
