<script> 
    export let product;
</script>

<li class="product-card">
    <a href="../product_pages/index.html?product={product.Id}">
        <img
        src="{product.Images.PrimaryMedium}"
        alt="{product.Name}"/>
        <h3 class="card__brand">{product.Brand.Name}</h3>
        <h2 class="card__name">{product.NameWithoutBrand}</h2>
        <p class="product-card__price"><span class="product-card__retail-price">{product.SuggestedRetailPrice>product.ListPrice?"$"+product.SuggestedRetailPrice.toFixed(2):""}</span> ${product.ListPrice}</p>
    </a>
</li>
