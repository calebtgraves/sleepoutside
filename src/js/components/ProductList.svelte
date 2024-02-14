<script>
import { getData } from "../productData.mjs";
import ProductSummary from "./ProductSummary.svelte";

let sortBy = "name"
let sortDirection = 1

// this is how we make a prop in svelte
export let category;
// if you are looking at this thinking that's strange to just stop with a promise
// you would be right.  This will make more sense in a bit...stay tuned.
let promise = getData(category);

async function handleSortBy(){
    let products = await getData(category)
    .then((data)=>{
        promise = data.sort((a,b)=>{
            if(sortBy == "price"){
                return (a.FinalPrice-b.FinalPrice)*sortDirection
            }else if(sortBy == "name"){
                if(a.NameWithoutBrand > b.NameWithoutBrand){
                    return 1*sortDirection
                }else if(b.NameWithoutBrand > a.NameWithoutBrand){
                    return -1*sortDirection
                }
                return 0
            }
        })
    })
}
handleSortBy()
</script>

<div id="products-header">
    <h2>Top products: {category}</h2>
    <div id="sort">
        <h3>Sort By:</h3>
        <select bind:value={sortBy} on:change={handleSortBy}>
            <option value="name">name</option>
            <option value="price">price</option>
        </select>
        <select bind:value={sortDirection} on:change={handleSortBy}>
            <option value={1}>ascending</option>
            <option value={-1}>descending</option>
        </select>
    </div>
</div>
{#await promise}
    Loading
{:then products}
<ul class="product-list">
{#each products as product}
    <ProductSummary product={product}/>
{/each}
</ul>
{/await}

<style>
    #products-header{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    #sort{
        display:flex;
    }
    #sort h3{
        margin:0;
        margin-right:1rem;
    }
</style>