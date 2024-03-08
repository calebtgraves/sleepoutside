import { alertMessage, redirect, setLocalStorage } from './utils.mjs'
import { loginRequest } from './externalServices.mjs'
import { jwtDecode } from 'jwt-decode'

export async function login(creds, redir) {
    // Get a jwt token
    const response = await loginRequest(creds);
    if (response.accessToken) {
        //console.log(response.accessToken);
        setLocalStorage('so_token', response.accessToken);
        redirect(redir);
    } else {
        alertMessage(response.message);
    }
}

export function isTokenValid(token) {
    if (token) {
        const decoded = jwtDecode(token);
        let date = new Date();
        if (decoded.exp * 1000 < date.getTime()) {
            alertMessage('Session expired');
            return false;
        } else {
            return true;
        }
    }
    else return false;
}

export function checkLogin() {
    // check if user is already logged in
    const token = localStorage.getItem('so_token');
    if (isTokenValid(token)) {
        //redirect('/orders/index.html');
        return token;
    }
    // if valid token does not exist in localstorage, redirect to login page
    else {
        localStorage.removeItem('so_token');
        redirect('/login/index.html');
    }
}