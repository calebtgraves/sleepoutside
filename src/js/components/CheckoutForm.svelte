<script>
    import { getLocalStorage, updateCart, alertMessage, redirect } from "../utils.mjs";
    import { cartItems } from "../stores.mjs";
    import { checkout } from "../externalServices.mjs";

    updateCart();

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
    
    // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
    function packageItems() {
        let packagedItems = [];
        $cartItems.forEach( (item) => {
            let packagedItem = {
                id: item.Id,
                name: item.Name,
                price: item.FinalPrice,
                quantity: item.quantity
            };
            packagedItems.push(packagedItem);
        });
        return packagedItems;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        let form = new FormData(this);
        let convertedJSON = {};

        convertedJSON["orderDate"] = new Date();
        form.forEach( (value, key) => {
            convertedJSON[key] = value;
        });
        convertedJSON["items"] = packageItems();
        convertedJSON["orderTotal"] = orderTotal.toFixed(2).toString();
        convertedJSON["shipping"] = shipping;
        convertedJSON["tax"] = tax.toFixed(2).toString();
        console.log(convertedJSON);

        // call the checkout method in our externalServices module and send it our data object.
        let data = await checkout(convertedJSON);
        console.log(data)
        } catch(err) {
            for (let error in err.message) {
                alertMessage(err.message[error]);
            }
        }

        // Give success message and clear the cart
        localStorage.removeItem("so-cart");
        window.location = "/checkout/success.html";
    }

    init();
</script>

<form action="" on:submit={handleSubmit} >
    <fieldset>
        <legend>Shipping</legend>
        <label for="fname">First Name</label>
        <input name="fname" value="" required>

        <label for="lname">Last Name</label>
        <input name="lname" value="" required>

        <label for="street">Street</label>
        <input name="street" value="" required>

        <label for="city">City</label>
        <input name="city" value="" required>

        <label for="state">State</label>
        <input name="state" value="" required>

        <label for="zip">Zip</label>
        <input name="zip" required on:change = {calculateOrderTotal}>
    </fieldset>
    <fieldset>
        <legend>Payment</legend>
        <label for="cardNumber">Card Number</label>
        <input name="cardNumber" value="1234123412341234" required>

        <label for="expiration">Expiration</label>
        <input name="expiration" value="" required>

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
    <button type="submit">Place Order</button>
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