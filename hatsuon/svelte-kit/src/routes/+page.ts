import type { PageLoad } from "./$types";
import { collections } from "./data";

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageLoad = () => {
  return {
    collections: collections.map((c) => ({
      id: c.id,
      title: c.title,
    })),
  };
};
