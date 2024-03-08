<script>
    import { getParam, redirect } from "../utils.mjs";
    import { login } from "../auth.mjs";
    getParam("redirect");

    async function handleLogin() {
        // e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const creds = { email, password };
        const redir = "/orders/index.html";
        login(creds, redir);
    }

</script>
<form>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" value="user1@email.com">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" value="user1">
    <button type="submit" on:click|preventDefault = {handleLogin}>Login</button>
</form>