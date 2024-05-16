import { writable } from "svelte/store";
import { fetchApi } from "../utils/fetchApi";
import { navigate } from "svelte-routing";
import { tick } from "svelte";

/**
 * If user is logged in, returns true
 */
const isLoggedIn = writable(false);

/**
 * Login request
 */
const login = async (username: string, password: string) => {
  fetchApi(
    `api-auth/login/`,
    {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    },
    { "Content-Type": "application/json" }
  )
    .then((res) => JSON.stringify(res))
    .then(async (res) => {
      console.log(res);
      isLoggedIn.set(true);
      await tick();
      navigate("/", { replace: true });
    })
    .catch((e) => {
      isLoggedIn.set(false);
      tick();
      console.error(e);
      alert("Login failed");
    });
};

/**
 * GET request to check if user has authenticated
 */
const checkHasAuthenticated = async () => {
  const result = await fetchApi("api/v1/");
  if (result.status === 403) {
    // not logged in
    isLoggedIn.set(false);
  }
  if (result.status === 200) {
    isLoggedIn.set(true);
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
    { "Content-Type": "application/json" }
  );
  if (result.ok) {
    navigate("/logout", { replace: true });
  }
};

export default {
  isLoggedIn,
  login,
  checkHasAuthenticated,
  logout,
};
