import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter } from "./utils.mjs";

new ProductList({
  target: document.querySelector(".products"),
  props: { category: "tents" },
});

renderHeaderFooter();
