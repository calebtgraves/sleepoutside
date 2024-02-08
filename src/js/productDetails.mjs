import { findProductById } from "./productData.mjs";
import { cartCount, cartItems } from "./stores.mjs";
import { addToCart } from "./utils.mjs";

let product = {};

// entry point
export default async function productDetails(productID, selector) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    product = await findProductById(productID);
    // once we have the product details we can render out the HTML
    const element = document.querySelector(selector);
    if(product){
        element.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
        // add a listener to Add to Cart button
        document.querySelector("#addToCart").addEventListener("click", ()=>{addToCart(product)});
    }else{
        element.insertAdjacentHTML("afterBegin", "<h2>Sorry, we couldn't find this product!</h2>")
    }
}

function productDetailsTemplate(p) {
    return `<h3 id="productName">${p.Brand.Name}</h3>
        <h2 class="divider" id="productNameWithoutBrand">${p.NameWithoutBrand}</h2>
        <img id="productImage" class="divider" src="${p.Image}" alt="" />
        <p class="product-card__price" id="productFinalPrice"><span class="product-card__retail-price">${p.SuggestedRetailPrice>p.ListPrice?"$"+p.SuggestedRetailPrice.toFixed(2):""}</span> $${p.FinalPrice}</p>
        <p class="product__color" id="productColorName">${p.Colors[0].ColorName}</p>
        <p class="product__description" id="productDescriptionHtmlSimple">${p.DescriptionHtmlSimple}</p>`;
}