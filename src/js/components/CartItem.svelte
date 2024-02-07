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
    <p class="cart-card__quantity">qty: {item.count}</p>
    <p class="cart-card__price"><span class="product-card__retail-price">${(item.SuggestedRetailPrice*item.count).toFixed(2)}</span> ${item.FinalPrice*item.count}</p>
  </li>

<style>
    li{
        width:100%;
    }
</style>