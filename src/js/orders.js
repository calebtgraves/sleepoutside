import { checkLogin } from "./auth.mjs";
import { getOrders } from "./externalServices.mjs";
import { getLocalStorage, renderHeaderFooter } from "./utils.mjs";
import OrderList from "./components/OrdersList.svelte";

checkLogin();

async function setOrders() {
  const orders = await getOrders(getLocalStorage("so_token"));
  new OrderList({
    target: document.querySelector("#orders"),
    props: {
      orders,
    },
  });
}

renderHeaderFooter();
setOrders();
