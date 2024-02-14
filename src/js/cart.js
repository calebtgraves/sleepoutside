import { getLocalStorage } from "./utils.mjs";
import { renderHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./components/ShoppingCart.svelte";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  new ShoppingCart({
    target:document.querySelector(".products"),
  })
}
renderHeaderFooter();

renderCartContents();

