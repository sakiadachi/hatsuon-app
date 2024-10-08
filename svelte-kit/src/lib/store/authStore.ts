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
    "api-auth/login/",
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
    isLoggedIn.set(true);
    goto("/", { replaceState: true });
    return result;
  }
  isLoggedIn.set(false);
  console.error("Login failed");
  return result;
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

/**
 * Sign up a user
 * @param user
 */
const signup = async (user: AuthUser) =>
  fetchApi(
    "api-auth/registration/",
    {
      method: "POST",
      body: JSON.stringify(user),
    },
    { "Content-Type": "application/json" },
  );

/**
 * Reset Store states
 * Edit here when adding a state
 */
const resetStore = () => {
  isLoggedIn.set(false);
};

export default {
  isLoggedIn,
  login,
  logout,
  signup,
  resetStore,
};
