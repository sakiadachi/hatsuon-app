import { writable } from "svelte/store";
import { goto } from "$app/navigation";
import { fetchApi } from "$lib/utils/fetchApi";

/**
 * If user is logged in, returns true
 */
const isLoggedIn = writable(false);

/**
 * Login request
 */
const login = async (username: string, password: string) => {
  const result = await fetchApi(
    `api-auth/login/`,
    {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    },
    { "Content-Type": "application/json" },
  );
  if (result.ok) {
    const json = result.json();
    isLoggedIn.set(true);
    goto("/", { replaceState: true });
    return;
  }
  isLoggedIn.set(false);
  console.error("Login failed");
};

/**
 * GET request to check if user has authenticated
 */
const checkHasAuthenticated = async () => {
  const result = await fetchApi("api/v1/");
  if (result.ok) {
    isLoggedIn.set(true);
  } else {
    isLoggedIn.set(false);
    goto("/login", { replaceState: true });
  }
};

/**
 * Log out
 */
const logout = async () => {
  const result = await fetchApi(
    "api-auth/logout/",
    {
      method: "POST",
    },
    { "Content-Type": "application/json" },
  );
  if (result.ok) {
    isLoggedIn.set(false);
    return true;
  }
  return false;
};

export default {
  isLoggedIn,
  login,
  checkHasAuthenticated,
  logout,
};
