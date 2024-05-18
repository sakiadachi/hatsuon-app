import { writable, type Writable } from "svelte/store";

export type currentRouteType =
  | "/"
  | "/login"
  | "/logout"
  | "/collection/:id"
  | "/collection/:id/phrase/:p_id";

export const currentRoute: Writable<currentRouteType> = writable("/");

const routesRegexp = [
  "^/collection/.*/phrase/.*$",
  "^/collection/.*$",
  "/$",
  "/login$",
  "/logout$",
];

export const checkRoute = (route: string): currentRouteType => {
  const result = routesRegexp.filter((re) => new RegExp(re).test(route));
  if (result.length === 0) {
    return "/";
  }
  switch (result[0]) {
    case "^/collection/.*/phrase/.*$":
      return "/collection/:id/phrase/:p_id";
    case "^/collection/.*$":
      return "/collection/:id";
    case "/$":
      return "/";
    case "/login$":
      return "/login";
    case "/logout$":
      return "/logout";
    default:
      return "/";
  }
};
