<script>
    import { searchItems } from '../stores.mjs';
    const baseURL = import.meta.env.VITE_SERVER_URL;
    let searchTerm = '';
    let searchResults = []; // This will hold the fetched results
    let filteredSearchResults = []; // This will hold the filtered results

    async function search() {
        if (searchTerm != "") {
            window.location.href = `/searchResults/index.html?query=${searchTerm}`; 
        }
    }


</script>

<div class="search-bar">
    <input type="text" bind:value={searchTerm} placeholder="Search...">
    <button on:click={search}>Search</button>
</div>

<style>
    .search-bar {
        display: flex;
        align-items: center;
        margin: 8px 8px 8px 0;
        padding: 1rem;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
    }

    button {
        padding: 0.25rem 0.5rem;
        border: none;
        border-radius: 0.25rem;
        margin-left: 0.25rem;
        margin-bottom: 0.05rem;
        color: white;
        background-color: #454d32;
    }

    button:hover {
        background-color: #5f7b6e;
    }
</style>
