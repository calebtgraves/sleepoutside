<script>
import CartItem from "./CartItem.svelte";
import { cartItems,totalFinalPrice,totalRetailPrice } from "../stores.mjs";
import { updateCart, redirect } from "../utils.mjs";

updateCart()
</script>

{#if $cartItems.length > 0}
    <h4>Total: <span class="product-card__retail-price">${($totalRetailPrice).toFixed(2)}</span> ${$totalFinalPrice.toFixed(2)}</h4>
<ul class="product-list">
{#each $cartItems as item}
    <CartItem item={item} quantity={item.quantity}/>
    <button id="checkout-button" on:click={ () => redirect("/checkout/index.html") }>Checkout</button>
{/each}
</ul>
{:else}
<p class="empty-cart-indicator">Your cart is empty</p>
{/if}

<style>
    .empty-cart-indicator{
        text-align: center;
    }
</style>