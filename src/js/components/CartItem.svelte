<script> 
    import { addToCart, removeFromCart } from "../utils.mjs"

    export let quantity
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
    <div class="cart-card__quantity-container">
        <p class="cart-card__quantity">qty: {quantity}</p>
        <div class="cart-card__quantity-buttons">
            <button on:click={()=>{addToCart(item)}}>╱╲</button>
            <button on:click={()=>{removeFromCart(item,false)}}>╲╱</button>
        </div>
        <button id="remove-button" on:click={()=>{removeFromCart(item)}}>✕</button>
    </div>
    <p class="cart-card__price"><span class="product-card__retail-price">${(item.SuggestedRetailPrice*item.quantity).toFixed(2)}</span><br/> ${(item.FinalPrice*item.quantity).toFixed(2)}</p>
  </li>

<style>
    li{
        width:100%;
    }
    .card__name{
        padding-right:1rem;
    }
    .cart-card__quantity-container{
        display:flex;
        align-items: center;
        position:relative;
    }
    .cart-card__quantity-buttons{
        display:flex;
        flex-direction: column;
        margin-left:.5rem;
    }
    .cart-card__quantity-buttons button{
        background-color:lightgrey;
        color:black;
        font-size:.2rem;
        padding:0;
        width:1rem;
        height:.7rem;
        margin:.05rem;
        user-select: none;
    }
    .cart-card__quantity-buttons button:hover{
        opacity:80%;
    }
    .cart-card__quantity-buttons button:active{
        filter:brightness(50%)
    }
    #remove-button{
        padding:0;
        font-size:1rem;
        height:1.2rem;
        width:1.2rem;
        line-height: 1rem;
        position:absolute;
        top:0;
        right:0;
    }
</style>