<script>
    import { getAllItems } from "../utils.mjs";
    import { searchItems } from "../stores.mjs";
    import ProductSummary from "./ProductSummary.svelte";
    export let thisProduct
    let suggestedProducts = []
    async function getSuggestedItems(){
        if($searchItems.length == 0){
            await getAllItems()
        }
        for(let i=0; i<3; i++){
            let product = $searchItems[Math.floor((Math.random()*$searchItems.length))]
            let go = true;
            if(thisProduct){
                if(product.Id == thisProduct.Id){
                    i -= 1
                    go = false;
                }
            }
            if(go){
                let add = true;
                for(let item in suggestedProducts){
                    if(item.Id == product.Id){
                        i -= 1
                        add = false;
                        break
                    }
                }
                if(add){
                    suggestedProducts.push(product)
                }
            }
        }
    }
</script>

<h2>You might also like...</h2>
{#await getSuggestedItems()}
    <p>Loading products...</p>
{:then}
<ul>
    {#each suggestedProducts as product}
        <ProductSummary product={product}/>
    {/each}
</ul>
{/await}

<style>
    ul{
        display:flex;
        flex-wrap:wrap;
        justify-content: center;
        padding:0;
    }
    h2{
        margin-left:.5rem;
    }
    p{
        text-align: center;
    }
</style>