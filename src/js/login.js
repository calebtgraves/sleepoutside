import Login from "./components/Login.svelte";
import { renderHeaderFooter } from "./utils.mjs";

new Login({
  target: document.querySelector("#login-form"),
});

renderHeaderFooter();
