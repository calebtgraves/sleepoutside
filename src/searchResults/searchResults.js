import { renderHeaderFooter } from "../js/utils.mjs";
import SearchResult from "../js/components/SearchResult.svelte";
import { getParam } from "../js/utils.mjs";

let query = getParam("query");

new SearchResult({
  target: document.querySelector(".products"),
  props: { query: query },
});

renderHeaderFooter();
