<script>
    import { onMount } from "svelte";
    import ImageCarousel from "./ImageCarousel.svelte";
    export let p
    let card
    let htmlDescription;
    onMount(()=>{
        htmlDescription.innerHTML = p.DescriptionHtmlSimple;
    })
    function handleCloseCard(){
        card.parentElement.style.display = "none";
    }
</script>
<div class="card" bind:this={card}>
    <button class="close-card" on:click={handleCloseCard}>𐄂</button>
    <h3 id="productName">{p.Brand.Name}</h3>
    <h2 class="divider" id="productNameWithoutBrand">{p.NameWithoutBrand}</h2>
    <ImageCarousel item={p}/>
    <div class="info">
        <p class="product-card__price" id="productFinalPrice"><span class="product-card__retail-price">{p.SuggestedRetailPrice>p.ListPrice?"$"+p.SuggestedRetailPrice.toFixed(2):""}</span> ${p.FinalPrice.toFixed(2)}</p>
        <p class="product__color" id="productColorName">{p.Colors[0].ColorName}</p>
        <p class="product__description" id="productDescriptionHtmlSimple" bind:this={htmlDescription}></p>
    </div>
</div>
<style>
    .card{
        position:relative;
        background-color: white;
        display:grid;
        grid-template-columns: 1fr 2fr;
        padding:20px;
        width:60%;
        border-radius:10px;
    }
    .close-card{
        padding:0;
        margin:0;
        position:absolute;
        background-color:transparent;
        color:black;
        top:10px;
        right:10px;
        height:1rem;
        width:1rem;
        line-height:1rem;
    }
    h2{
        grid-column:1/3;
    }
    h3{
        margin-top:0;
    }
</style>