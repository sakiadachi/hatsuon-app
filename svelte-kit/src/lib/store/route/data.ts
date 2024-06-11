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
    route_id: "/",
  },
  {
    name: "CollectionDetail",
    route_id: "/collection/[id]",
  },
  {
    name: "CollectionCreate",
    route_id: "/collection/create",
  },
  {
    name: "PhraseCreate",
    route_id: "/collection/[id]/phrase/create",
  },
  {
    name: "PhraseDetail",
    route_id: "/collection/[id]/phrase/[id]",
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
