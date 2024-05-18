import getCookie from "./getCookie";

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
  return await fetch(`http://127.0.0.1:8000/${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...additionalHeaders,
      ...csrfHeader,
    },
  });
}
