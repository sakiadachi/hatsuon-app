import { redirect } from "@sveltejs/kit";

const { VITE_API_BASE_URL } = import.meta.env;

export async function load({ cookies }) {
  let isLoggedIn = false;

  /**
   * check authentication
   */
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
    if (result.status === 200) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
      throw redirect(303, "/login");
    }
  } else {
    isLoggedIn = false;
    throw redirect(303, "/login");
  }

  return {
    isLoggedIn,
  };
}
