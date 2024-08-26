import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = true;
export const ssr = false;

export const load: PageLoad = async () => {
	let collections: Collection[] = [];

	const result = await fetchApi("api/v1/collections/");
	if (result.ok) {
		const items = await result.json();
		collections = items.results;
	} else {
		error(result.status, result.statusText);
	}
	return {
		collections,
	};
};
