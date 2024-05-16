<script lang="ts">
  import auth_store from "../../store/auth_store";

  const { login } = auth_store;

  const handleSubmit = async (
    event: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    },
  ) => {
    event.preventDefault();
    if (event.target == null) {
      return;
    }

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const username = formData.get("username").toString();
    const password = formData.get("password").toString();

    await login(username, password);
  };
</script>

<h1>Login</h1>
<form on:submit={handleSubmit} class="flex flex-col gap-4">
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
