<script>
    import { getData } from "../productData.mjs";
    import CartItem from "./CartItem.svelte";
    
    // this is how we make a prop in svelte
    export let category;
    // if you are looking at this thinking that's strange to just stop with a promise
    // you would be right.  This will make more sense in a bit...stay tuned.
    let promise = getData(category);
</script>
    
    {#await promise}
        Loading
    {:then products}
    <ul class="product-list">
    {#each products as product}
        <CartItem product={product}/>
    {/each}
    </ul>
    {/await}