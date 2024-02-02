import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId, ".product-detail");

const addToCartButton = document.querySelector("#addToCart");
addToCartButton.addEventListener("click", () => {
  const cartIcon = document.querySelector(".cart");
  cartIcon.classList.add("shakeAnimation");

  setTimeout(() => {
    cartIcon.classList.remove("shakeAnimation");
  }, 4000);
});
