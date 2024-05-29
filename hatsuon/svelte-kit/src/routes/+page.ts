import type { PageLoad } from "./$types";
import { collections } from "./data";

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production

export const load: PageLoad = () => {
  // Can't make request using CSRF token because its stored in browser cookie!
  // const result = await fetchApi("api/v1/collections/");
  // const collections:Collection[] = await result.json();

  return {
    collections: collections.map((c) => ({
      id: c.id,
      title: c.title,
    })),
  };
};
