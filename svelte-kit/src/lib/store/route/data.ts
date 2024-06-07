export type RouteName =
  | "Home"
  | "CollectionDetail"
  | "CollectionCreate"
  | "PhraseCreate"
  | "PhraseDetail"
  | "Login"
  | "Logout";

export type NavItem = {
  name: RouteName;
  route_id: string;
};

export const nav_items: NavItem[] = [
  {
    name: "Home",
    route_id: "/(authed)",
  },
  {
    name: "CollectionDetail",
    route_id: "/(authed)/collection/[id]",
  },
  {
    name: "CollectionCreate",
    route_id: "/(authed)/collection/create",
  },
  {
    name: "PhraseCreate",
    route_id: "/(authed)/collection/[id]/phrase/create",
  },
  {
    name: "PhraseDetail",
    route_id: "/(authed)/collection/[id]/phrase/[id]",
  },
  {
    name: "Login",
    route_id: "/login",
  },
  {
    name: "Logout",
    route_id: "/logout",
  },
];
