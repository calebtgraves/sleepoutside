import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    // show cart total if more than 0
    if (htmlItems.length > 0) {
      document.querySelector("#total-label").classList.remove("hidden");
      let total = 0;
      cartItems.map((item) => {
        total += item.FinalPrice;
      });
      document.querySelector("#cart-total").innerHTML = `$${total.toFixed(2)}`;
    }
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Cart is empty</p>";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
<<<<<<< Updated upstream
  <p class="cart-card__price">$${item.FinalPrice}</p>
=======
  <p class="cart-card__price"><span class="product-card__retail-price">$${item.SuggestedRetailPrice.toFixed(2)}</span> $${item.FinalPrice}</p>
>>>>>>> Stashed changes
</li>`;

  return newItem;
}

renderCartContents();
