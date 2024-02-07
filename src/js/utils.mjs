import MainFooter from "./components/MainFooter.svelte" ;
import MainHeader from "./components/MainHeader.svelte" ;

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  let content = getLocalStorage(key);
  if (key === "so-cart") {
    content ? content.push(data) : (content = [data]);
  }
  localStorage.setItem(key, JSON.stringify(content));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function getCartCount() {
  const cart = getLocalStorage("so-cart");
  if (cart) {
    return cart.length;
  }
}
export function renderHeaderFooter() {
  new MainHeader({
    target: document.querySelector("#main-header"),
  });
  new MainFooter({
    target: document.querySelector("#main-footer")
  });
}
