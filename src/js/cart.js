import { getLocalStorage } from "./utils.mjs";
import { renderHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./components/ShoppingCart.svelte";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");
  let cartTotals = [0,0]
  if(cartItems){
    let revisedCartItems = []
    let itemNums = {}
    cartItems.forEach((item)=>{
      cartTotals[0] += item.SuggestedRetailPrice
      cartTotals[1] += item.FinalPrice
      if(item.Id in itemNums){
        itemNums[item.Id].count += 1
      }else{
        itemNums[item.Id] = item
        itemNums[item.Id].count = 1
      }
    })
    for(const item in itemNums){
      revisedCartItems.push(itemNums[item])
    }
    cartItems = revisedCartItems
  }
  new ShoppingCart({
    target:document.querySelector(".products"),
    props: {cartItems:cartItems, cartTotals:cartTotals}
  })
}

renderCartContents();

renderHeaderFooter();
