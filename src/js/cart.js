import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    // show cart total if more than 0
    if (htmlItems.length > 0) {
      document.querySelector("#total-label").classList.remove("hidden");
      let retailTotal = 0
      let total = 0;
      cartItems.map((item) => {
        total += item.FinalPrice;
        retailTotal += item.SuggestedRetailPrice
      });
      document.querySelector("#cart-total").innerHTML = `<span class="product-card__retail-price">${retailTotal>total?"$"+retailTotal.toFixed(2):""}</span> $${total.toFixed(2)}`;
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

  <p class="cart-card__price"><span class="product-card__retail-price">$${item.SuggestedRetailPrice.toFixed(2)}</span> $${item.FinalPrice}</p>
  <span data-id=${item.Brand.Id}>❌</span>

</li>`;

  return newItem;
}

renderCartContents();

const productlist = document.querySelector(".product-list");
productlist.addEventListener("click", function(event) {
  if (event.target.classList.contains("removefromcart")) {
    const span= event.target;
    const itemId = span.dataset.id;
    removeFromCart(itemId);
  }
});
const remove = document.querySelector("#removefromcart");
remove.addEventListener(click, removeFromCart);

function removeFromCart(itemId){
  let cartItems = getLocalStorage("so-cart");
  const indexToRemove = cartItems.findIndex(item => item.Brand.Id === itemId);
  
  if (indexToRemove != -1) {
    cartItems.splice(indexToRemove, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}
