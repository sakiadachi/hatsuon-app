import { writable } from "svelte/store";
import { fetchApi } from "../utils/fetchApi";
import { navigate } from "svelte-routing";

/**
 * If user is logged in, returns true
 */
const isLoggedIn = writable(false);

/**
 * Login request
 */
const login = async (username: string, password: string) => {
	const result = await fetchApi(
		`api-auth/login/`,
		{
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
		},
		{ "Content-Type": "application/json" },
	);
	if (result.ok) {
		const json = result.json();
		isLoggedIn.set(true);
		navigate("/", { replace: true });
		return;
	}
	isLoggedIn.set(false);
	console.error("Login failed");
};

/**
 * GET request to check if user has authenticated
 */
const checkHasAuthenticated = async () => {
	const result = await fetchApi("api/v1/");
	if (result.status === 403) {
		// not logged in
		isLoggedIn.set(false);
	}
	if (result.status === 200) {
		isLoggedIn.set(true);
	}
};

/**
 * Log out
 */
const logout = async () => {
	const result = await fetchApi(
		"api-auth/logout/",
		{
			method: "POST",
		},
		{ "Content-Type": "application/json" },
	);
	if (result.ok) {
		isLoggedIn.set(false);
		return true;
	}
	return false;
};

export default {
	isLoggedIn,
	login,
	checkHasAuthenticated,
	logout,
};
