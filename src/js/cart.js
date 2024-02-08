import { getLocalStorage } from "./utils.mjs";
import { renderHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./components/ShoppingCart.svelte";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  // if (cartItems) {
  //   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  //   // show cart total if more than 0
  //   if (htmlItems.length > 0) {
  //     document.querySelector("#total-label").classList.remove("hidden");
  //     let retailTotal = 0
  //     let total = 0;
  //     cartItems.map((item) => {
  //       total += item.FinalPrice;
  //       retailTotal += item.SuggestedRetailPrice
  //     });
  //     document.querySelector("#cart-total").innerHTML = `<span class="product-card__retail-price">${retailTotal>total?"$"+retailTotal.toFixed(2):""}</span> $${total.toFixed(2)}`;
  //   }
  //   document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // } else {
  //   document.querySelector(".product-list").innerHTML = "<p>Cart is empty</p>";
  // }
  new ShoppingCart({
    target:document.querySelector(".products"),
  })
}
renderHeaderFooter();

renderCartContents();

