import { writable } from "svelte/store";
import auth_store from "./auth_store";

const { checkHasAuthenticated } = auth_store;
export const currentRoute = writable("/");

currentRoute.subscribe(async (route) => {
	console.log(route);
	currentRoute.set(route);
	await checkHasAuthenticated();
});
