import { renderHeaderFooter } from "./utils.mjs";
import CheckoutForm from "./components/CheckoutForm.svelte"

function renderForm() {
    new CheckoutForm({
        target: document.querySelector(".form"),
    });
}
renderHeaderFooter();

renderForm();