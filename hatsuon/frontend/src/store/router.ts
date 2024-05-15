import { writable } from "svelte/store";
import { checkIsLoggedIn } from "./login_store";

export const currentRoute = writable("/");

export const checkCurrentRoutePath = () => {
  const { pathname } = window.location;
  currentRoute.set(pathname);
};

currentRoute.subscribe(async (route) => {
  console.log(route);
  currentRoute.set(route);
  await checkIsLoggedIn();
});
