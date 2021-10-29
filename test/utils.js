const API_URL = 'http://localhost:3100/';

function alert(selector, success, message) {
    const alert = document.querySelector(selector);
    alert.classList.remove('alert-success');
    alert.classList.remove('alert-danger');
    alert.classList.add(success ? 'alert-success' : 'alert-danger');
    alert.innerText = message;
    alert.style.display = '';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000);
}

async function post(endpoint, body) {
    const response = await fetch(API_URL + endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'auth-token': 'SECRET-DEV-KEY', //TODO: replace this with the actual
        },
        body,
    });
    return await response.json();
}

function get() {

}