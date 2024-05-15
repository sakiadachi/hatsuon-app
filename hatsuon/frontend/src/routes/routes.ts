import Home from "./Home.svelte";
import Collection from "./collection/Collection.svelte";

type RouteType = {
  name: string;
  component: any;
};

const routes: RouteType[] = [
  {
    name: "/",
    component: Home,
  },
  {
    name: "/collection",
    component: Collection,
  },
];

export { routes };
