import { alertMessage, redirect, setLocalStorage } from './utils.mjs'
import { loginRequest } from './externalServices.mjs'


export async function login(creds, redir) {
    // Get a jwt token
    const response = await loginRequest(creds);
    if (response.accessToken) {
        //console.log(response.accessToken);
        setLocalStorage('so_token', response.accessToken);
        //redirect(redir);
    } else {
        alertMessage(response.message);
    }
}

export function isTokenValid() {
    // check an existing token to make sure it is not expired
    return true;
}

export function checkLogin() {
    // check if user is already logged in

    // if valid token does not exist in localstorage, redirect to login page
    if (!isTokenValid()) {
        redirect('/login');
    }
}