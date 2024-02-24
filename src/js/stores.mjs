import { writable } from "svelte/store";
import { getCartCount, getLocalStorage } from "./utils.mjs";

export const cartCount = writable(getCartCount());
export const cartItems =  writable([])
export const totalRetailPrice = writable(0)
export const totalFinalPrice = writable(0)
export const searchItems = writable([])