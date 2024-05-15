import { writable } from "svelte/store";
import { fetchApi } from "../utils/fetchApi";

export const isLoggedIn = writable(false);

export const checkIsLoggedIn = async () => {
  const result = await fetchApi("api/v1/");
  if (result.status === 403) {
    // not logged in
    isLoggedIn.set(false);
  }
  if (result.status === 200) {
    isLoggedIn.set(true);
  }
};
