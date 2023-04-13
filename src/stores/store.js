import { persisted } from "svelte-local-storage-store";

export const store = persisted("store", {
  jwt: "",
  blurSurgeryFilter: false,
  username: "",
});
