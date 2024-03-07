import MainFooter from "./components/MainFooter.svelte" ;
import MainHeader from "./components/MainHeader.svelte" ;
import AlertMessage from "./components/AlertMessage.svelte" ;
import { cartCount, cartItems, totalFinalPrice, totalRetailPrice, searchItems } from "./stores.mjs";
const baseURL = import.meta.env.VITE_SERVER_URL;

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
    localStorage.setItem(key, JSON.stringify(content));
  }
  else if (key === "so_token") {
    localStorage.setItem(key, data);
  }
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

export function updateCart(){
  let retailTotal = 0;
  let finalTotal = 0;
  let items = getLocalStorage("so-cart")
  if(items){
    let revisedCartItems = [];
    let cartItemTotals = {}
    items.forEach((item)=>{
      retailTotal += item.SuggestedRetailPrice
      finalTotal += item.FinalPrice
      if(item.Id in cartItemTotals){
        cartItemTotals[item.Id].push(item)
      }else{
        cartItemTotals[item.Id] = [item]
      }
    })
    for(let item in cartItemTotals){
      cartItemTotals[item][0].quantity = cartItemTotals[item].length
      revisedCartItems.push(cartItemTotals[item][0])
    }
    totalFinalPrice.set(finalTotal)
    totalRetailPrice.set(retailTotal)
    cartItems.set(revisedCartItems)
  }
}

export function addToCart(product) {
  setLocalStorage("so-cart", product);
  cartCount.set(getCartCount());
  updateCart()
}

export function removeFromCart(product,all = true) {
  let cart = getLocalStorage("so-cart");
  let newCart = []
  if(all){
    newCart = cart.filter((item) => item.Id !== product.Id);
  }else{
    let itemRemoved = false
    cart.forEach((item)=>{
      if(item.Id == product.Id && !itemRemoved){
        itemRemoved = true
      }else{
        newCart.push(item)
      }
    })
  }
  localStorage.setItem("so-cart", JSON.stringify(newCart));
  cartCount.set(getCartCount());
  updateCart()
}

function convertToJson(res) {
  if (res.ok) {
      return res.json();
  } else {
      throw new Error("Bad Response");
  }
}

export async function getAllItems() {
  let list = [];
      const tentsResponse = await fetch(`${baseURL}products/search/tents`);
      let tentsData = await convertToJson(tentsResponse);
      list.push(...tentsData.Result);
      const sleepingbagResponse = await fetch(`${baseURL}products/search/sleeping-bags`);
      let sleepingbagData = await convertToJson(sleepingbagResponse);
      list.push(...sleepingbagData.Result);
      const hammockResponse = await fetch(`${baseURL}products/search/hammocks`);
      let hammockData = await convertToJson(hammockResponse);
      list.push(...hammockData.Result);
      const backpacksResponse = await fetch(`${baseURL}products/search/backpacks`);
      let backpackData = await convertToJson(backpacksResponse);
      list.push(...backpackData.Result);
      searchItems.set(list);
}

export function redirect(url) {
  window.location = url;
}

export function alertMessage(message, scroll=true, duration = 3000) {
  const alert = new AlertMessage({
    target: document.querySelector("body"),
    anchor: document.querySelector("main"),
    props: {
      message,
    },
  });

    // make sure they see the alert by scrolling to the top of the window
    //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
    if (scroll) window.scrollTo(0, 0);

    // left this here to show how you could remove the alert automatically after a certain amount of time.
    setTimeout(function () {
      alert.$destroy();
      }, duration);
}