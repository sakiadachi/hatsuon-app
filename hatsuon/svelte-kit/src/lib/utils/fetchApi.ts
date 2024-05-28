import getCookie from "./getCookie";

const { VITE_API_BASE_URL } = import.meta.env;

export async function fetchApi(
  path: string,
  options?: RequestInit,
  additionalHeaders?: HeadersInit,
): Promise<Response> {
  const csrfToken = getCookie("csrftoken");
  if (csrfToken === undefined) {
    console.warn("Expected csrfToken");
  }
  const csrfHeader =
    csrfToken === undefined
      ? undefined
      : {
          "X-CSRFToken": csrfToken,
        };
  return await fetch(`${VITE_API_BASE_URL}/${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...additionalHeaders,
      ...csrfHeader,
    },
  });
}
