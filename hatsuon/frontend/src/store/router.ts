import { writable, type Writable } from "svelte/store";
import auth_store from "./auth_store";

type currentRouteType =
  | "/"
  | "/login"
  | "/logout"
  | "/collection/"
  | "/phrase/";

export const currentRoute: Writable<currentRouteType> = writable("/");

const { checkHasAuthenticated } = auth_store;
const routes = ["/$", "/login$", "/logout$", "^/collection/", "^/phrase/"];

const checkRoute = (route: string) => {
  const regexp = new RegExp(routes.join("|"));
  const matched = route.match(regexp);
  return matched;
};
currentRoute.subscribe(async (route) => {
  console.log(route);
  const matched = checkRoute(route);
  if (matched == null) {
    currentRoute.set("/");
  }
  currentRoute.set(matched[0] as currentRouteType);
  await checkHasAuthenticated();
});
