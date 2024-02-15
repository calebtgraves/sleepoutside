import { renderHeaderFooter } from "../js/utils.mjs";
import ProductList from "../js/components/ProductList.svelte";
import { getParam } from "../js/utils.mjs";

let category = getParam("category");

new ProductList({
  target: document.querySelector(".products"),
  props: { category: category },
});

renderHeaderFooter();
