import { writable, type Writable } from "svelte/store";

export type currentRouteType =
  | "/"
  | "/login"
  | "/logout"
  | "/collections/:id"
  | "/collections/:id/phrase/:p_id";

export const currentRoute: Writable<currentRouteType> = writable("/");

const routesRegexp = [
  "^/collections/.*/phrase/.*$",
  "^/collections/.*$",
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
    case "^/collections/.*/phrase/.*$":
      return "/collections/:id/phrase/:p_id";
    case "^/collections/.*$":
      return "/collections/:id";
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
