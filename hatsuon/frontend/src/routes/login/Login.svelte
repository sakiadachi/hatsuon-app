<script lang="ts">
  import { fetchApi } from "../../utils/fetchApi";
  import { navigate } from "svelte-routing";
  import RouteWrapper from "../RouteWrapper.svelte";
  import { isLoggedIn } from "../../store/login_store";
  const handleSubmit = async (
    event: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) => {
    event.preventDefault();
    if (event.target == null) {
      return;
    }

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const username = formData.get("username");
    const password = formData.get("password");

    /**
     * Login request
     */
    fetchApi(
      `api-auth/login/`,
      {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      },
      { "Content-Type": "application/json" }
    )
      .then((res) => JSON.stringify(res))
      .then((res) => {
        isLoggedIn.set(true);
        navigate("/collection", { replace: true });
        console.log(res);
      })
      .catch((e) => {
        isLoggedIn.set(false);
        console.error(e);
        alert("Login failed");
      });
  };
</script>

<RouteWrapper>
  <h1>Login</h1>
  <form on:submit={handleSubmit}>
    <label>
      User Name:
      <input type="text" name="username" />
    </label>
    <label>
      Password:
      <input type="password" name="password" />
    </label>
    <button type="submit">submit</button>
  </form>
</RouteWrapper>
