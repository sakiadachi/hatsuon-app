// import type { Handle } from "@sveltejs/kit";

// /**
//  * https://kit.svelte.dev/docs/hooks#server-hooks-handle
//  * @type {import('@sveltejs/kit').Handle}
//  */
// export  const handle:Handle = async({ event, resolve }) => {
//   event.locals.user = await getUserInformation(event.cookies.get("sessionid"));

//   const response = await resolve(event);
//   response.headers.set("x-custom-header", "potato");

//   return response;
// }
