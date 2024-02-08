<script>
import CartItem from "./CartItem.svelte";
import { cartItems,totalFinalPrice,totalRetailPrice } from "../stores.mjs";
import { updateCart } from "../utils.mjs";

updateCart()
</script>

{#if $cartItems.length > 0}
<div class="total-container">
    <h2>Cart Total:</h2>
    <p><span class="product-card__retail-price">${($totalRetailPrice).toFixed(2)}</span> ${$totalFinalPrice.toFixed(2)}</p>
</div>
<ul class="product-list">
{#each $cartItems as item}
    <CartItem item={item} quantity={item.quantity}/>
{/each}
</ul>
{:else}
<p class="empty-cart-indicator">Your cart is empty</p>
{/if}

<style>
    .total-container{
        display:flex;
        align-items: center;
    }
    .total-container h2{
        margin:0;
    }
    .total-container p{
        margin:0;
        margin-top:.4rem;
        margin-left:.8rem;
    }
    .empty-cart-indicator{
        text-align: center;
    }
</style>