import { fetchApi } from "$lib/utils/fetchApi.js";
import type { LayoutLoad } from "./$types";

export const prerender = true;
// load function will only excecuted in the browser
// https://kit.svelte.dev/docs/page-options#ssr
export const ssr = false;
// https://kit.svelte.dev/docs/page-options#trailingslash
export const trailingSlash = "always";

export const load: LayoutLoad = async () => {
	let loginState = false;
	const result = await fetchApi("api/v1/");
	if (result.ok) {
		loginState = true;
	} else {
		loginState = false;
	}

	return {
		loginState,
	};
};
