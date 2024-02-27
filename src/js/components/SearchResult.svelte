<script>
    import ProductSummary from "./ProductSummary.svelte";
    import { searchItems } from "../stores.mjs";
    import { getAllItems } from "../utils.mjs"

    async function filterSearchResults(searchTerm) {
        if ($searchItems.length == 0) {
            await getAllItems();
        }
        let filteredList = $searchItems.filter((item) => {
            return item.Name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return filteredList;
    }

    let sortBy = "name"
    let sortDirection = 1
    
    export let query;
    let result = filterSearchResults(query);
    
    async function handleSortBy(){
        let products = await result;
        result = products.sort((a,b)=>{
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
    }
handleSortBy()
</script>
    
    <div id="products-header">
        <h2>Search Results: {query[0].toUpperCase()+query.slice(1).replace("-"," ")}</h2>
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
    {#await result}
    Loading
    {:then products}
    {#if products.length > 0}
    <ul class="product-list">
    {#each products as product}
        <ProductSummary product={product}/>
    {/each}
    </ul>
    {:else}
    <p>No results found</p>
    {/if}
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
        }
        #sort select{
            margin-left:.5rem;
        }
    </style>