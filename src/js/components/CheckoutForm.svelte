<script>
    import { getLocalStorage } from "../utils.mjs";

    let itemCount = 0;
    let subtotal = 0;
    let shipping = 0;
    let tax = 0;
    let orderTotal = 0;

    function init() {
        const cartItems = getLocalStorage("so-cart");
        itemCount = cartItems.length;
        calculateItemSummary(cartItems);
    }
    
    function calculateItemSummary(cartItems) {
        for (let item of cartItems)
        {
            subtotal += item.FinalPrice;
        }
    }

    function calculateOrderTotal() {
        shipping = 10 + 2 * (itemCount - 1);
        tax = 0.06 * subtotal;
        orderTotal = subtotal + shipping + tax;
    }

    init();
</script>

<form>
    <fieldset>
        <legend>Shipping</legend>
        <label for="fname">First Name</label>
        <input name="fname" value="Mwahahaha" required>

        <label for="lname">Last Name</label>
        <input name="lname" value="Mwahahaha" required>

        <label for="street">Street</label>
        <input name="street" value="784 Malibu" required>

        <label for="city">City</label>
        <input name="city" value="Modesto" required>

        <label for="state">State</label>
        <input name="state" value="California" required>

        <label for="zip">Zip</label>
        <input name="zip" required on:change = { calculateOrderTotal }>
    </fieldset>
    <fieldset>
        <legend>Payment</legend>
        <label for="cardNumber">Card Number</label>
        <input name="cardNumber" value="8888999922224444" required>

        <label for="expiration">Expiration</label>
        <input name="expiration" value="07/55" required>

        <label for="code">Security Code</label>
        <input name="code" value="123" required>
    </fieldset>
    <fieldset class="checkout-summary">
        <legend>Order Summary</legend>
        <div class="summary-item">
            <p>Item Subtotal ({itemCount})</p>
            <p>${subtotal.toFixed(2)}</p>
        </div>
        <div class="summary-item">
            <p>Shipping Estimate</p>
            <p>${shipping.toFixed(2)}</p>
        </div>
        <div class="summary-item">
            <p>Tax</p>
            <p>${tax.toFixed(2)}</p>
        </div>
        <div class="summary-item">
            <p><strong>Order Total</strong></p>
            <p>${orderTotal.toFixed(2)}</p>
        </div>
    </fieldset>
    <button>Place Order</button>
</form>

<style>
    form {
        width: 50%;
        margin: 0 auto;
    }

    fieldset {
        display: flex;
        flex-direction: column;
        padding: 20px;
        padding-top: 0;
        margin-bottom: 20px;
    }

    label {
        margin-top: 15px;
    }

    input {
        font-size: 1.3rem;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
    }

    @media screen and (max-width: 500px)
    {
        form {
            width: 95%;
        }

        input {
            padding: 10px;
        }
    }
</style>