import { renderHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./components/ShoppingCart.svelte";

function renderCartContents() {
  new ShoppingCart({
    target: document.querySelector(".products"),
  });
}
renderHeaderFooter();

renderCartContents();
