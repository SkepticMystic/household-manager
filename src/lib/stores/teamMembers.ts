import type { SID } from "$lib/interfaces";
import { get, writable } from "svelte/store";

const store = writable<SID<Omit<Lucia.UserAttributes, "userId">>[]>([]);

export const teamMembers = {
  store,
  set: store.set,
  subscribe: store.subscribe,
  getMemberById: (member_id: string | undefined) =>
    get(store).find((m) => m._id === member_id),
};
