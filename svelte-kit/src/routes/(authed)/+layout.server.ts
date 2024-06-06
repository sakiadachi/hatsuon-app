import { redirect } from "@sveltejs/kit";
import auth_store from "$lib/store/auth_store";
import { goto } from "$app/navigation";
import { fetchApi } from "$lib/utils/fetchApi";

const { VITE_API_BASE_URL } = import.meta.env;
const { isLoggedIn } = auth_store;

export async function load({ cookies }) {
  const csrftoken = cookies.get("csrftoken");
  const sessionid = cookies.get("sessionid");
  if (csrftoken && sessionid) {
    const result = await fetch(`${VITE_API_BASE_URL}/api/v1/`, {
      credentials: "include",
      headers: {
        "X-CSRFToken": csrftoken,
        Cookie: `csrftoken=${csrftoken}; sessionid=${sessionid}`,
      },
    });
    console.log("requested", result);
    if (!result.ok) {
      isLoggedIn.set(false);
      throw redirect(303, "/login");
    }
    isLoggedIn.set(true);
  } else {
    isLoggedIn.set(false);
    throw redirect(303, "/login");
  }
}
