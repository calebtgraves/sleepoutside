<script>
import CartItem from "./CartItem.svelte";

export let cartItems
export let cartTotals
</script>

{#if cartItems}
<div id="total-container">
    <h2>Total:</h2>
    <p><span class="product-card__retail-price">${(cartTotals[0]).toFixed(2)}</span> ${cartTotals[1]}</p>
</div>
<ul class="product-list">
{#each cartItems as item}
    <CartItem item={item}/>
{/each}
</ul>
{:else}
<p>Cart is empty</p>
{/if}

<style>
    #total-container{
        display:flex;
        align-items: center;
    }
    #total-container h2{
        margin:0;
    }
    #total-container p{
        margin:0;
        margin-left:1rem;
        padding-top:.4rem;
    }
</style>