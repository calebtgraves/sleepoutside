<script>
    import ProductSummary from "./ProductSummary.svelte";
    import { searchItems } from "../stores.mjs";
    const baseURL = import.meta.env.VITE_SERVER_URL;

    function convertToJson(res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Bad Response");
        }
    }

    async function search() {
        if ($searchItems.length == 0) {
            let list = [];
            const tentsResponse = await fetch(`${baseURL}products/search/tents`);
            let tentsData = await convertToJson(tentsResponse);
            list.push(...tentsData.Result);
            const sleepingbagResponse = await fetch(`${baseURL}products/search/sleeping-bags`);
            let sleepingbagData = await convertToJson(sleepingbagResponse);
            list.push(...sleepingbagData.Result);
            const hammockResponse = await fetch(`${baseURL}products/search/hammocks`);
            let hammockData = await convertToJson(hammockResponse);
            list.push(...hammockData.Result);
            const backpacksResponse = await fetch(`${baseURL}products/search/backpacks`);
            let backpackData = await convertToJson(backpacksResponse);
            list.push(...backpackData.Result);
            searchItems.set(list);
        }
    }

    async function filterSearchResults(searchTerm) {
        await search();
        let filteredList = $searchItems.filter((item) => {
            return item.Name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return filteredList;
    }

    let sortBy = "name"
    let sortDirection = 1
    
    // this is how we make a prop in svelte
    export let query;
    // if you are looking at this thinking that's strange to just stop with a promise
    // you would be right.  This will make more sense in a bit...stay tuned.
    let result = filterSearchResults(query);
    console.log(result)
    console.log($searchItems)
    
    async function handleSortBy(){
        let products = await result;
        console.log(products)
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