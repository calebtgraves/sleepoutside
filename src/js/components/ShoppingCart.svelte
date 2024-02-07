<script>
import CartItem from "./CartItem.svelte";

export let cartItems
</script>

{#if cartItems}
<ul class="product-list">
{#each cartItems as item}
    <CartItem item={item}/>
{/each}
</ul>
{:else}
<p>Cart is empty</p>
{/if}