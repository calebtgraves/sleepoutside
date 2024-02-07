<script> 
    export let item;
</script>

<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="{item.Image}"
        alt="{item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">{item.Name}</h2>
    </a>
    <p class="cart-card__color">{item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price"><span class="product-card__retail-price">${item.SuggestedRetailPrice.toFixed(2)}</span> ${item.FinalPrice}</p>
  </li>
