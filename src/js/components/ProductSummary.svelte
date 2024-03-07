<script>
    import QuickLook from "./QuickLook.svelte";
    export let product;
    let lookupCard
    function handleQuickLookup(){
        lookupCard.style.display = "flex";
    }
</script>
<div class="lookup-card" bind:this={lookupCard}>
    <QuickLook p={product}/>
</div>
<li class="product-card">
    <button class="quick-look" title="Quick Look" on:click={handleQuickLookup}></button>
    <a href="../product_pages/index.html?product={product.Id}">
        <img
        src="{product.Images.PrimaryMedium}"
        alt="{product.Name}"/>
        <h3 class="card__brand">{product.Brand.Name}</h3>
        <h2 class="card__name">{product.NameWithoutBrand}</h2>
        <p class="product-card__price"><span class="product-card__retail-price">{product.SuggestedRetailPrice>product.ListPrice?"$"+product.SuggestedRetailPrice.toFixed(2):""}</span> ${product.ListPrice.toFixed(2)}</p>
    </a>
</li>
<style>
    .lookup-card{
        display:none;
        position:fixed;
        background-color:rgba(0,0,0,25%);
        z-index:1;
        justify-content: center;
        align-items: center;
        top:0;
        left:0;
        bottom:0;
        right:0;
    }
    .quick-look{
        padding:0;
        margin:0;
        height:2rem;
        width:2rem;
        background-image:url('../../public/images/magnifying_glass.svg');
        background-size:65%;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 50%;
        position:absolute;
        top:5px;
        right:5px;
        opacity:75%;
        background-color:transparent;
        display:none;
        transition:.2s ease-in-out;
    }
    .quick-look:hover{
        background-color:darkgrey;
    }
    .quick-look:active{
        background-color:grey;
    }
    li:hover>.quick-look{
        display:inline-block;
    }
    li{
        position:relative;
        list-style:none;
        flex-grow:0;
        flex-shrink:0;
    }
    a{
        text-decoration: none;
        color:black;
    }
</style>