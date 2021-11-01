const API_URL = 'http://localhost:3100/';

function alert(selector, success, message, cb) {
    const alert = document.querySelector(selector);
    alert.classList.remove('alert-success');
    alert.classList.remove('alert-danger');
    alert.classList.add(success ? 'alert-success' : 'alert-danger');
    alert.innerText = message;
    alert.style.display = '';
    setTimeout(() => {
        alert.style.display = 'none';
        if (cb)
            cb();
    }, 5000);
}

function post(endpoint, body) {
    return network(endpoint, 'POST', body);
}

async function patch(endpoint, body) {
    console.log(body);
    return network(endpoint, 'PATCH', body);
}

function get(endpoint) {
    return network(endpoint, 'GET');
}

async function network(endpoint, method, headers, body) {
    const response = await fetch(API_URL + endpoint, {
        method,
        headers: {

            Accept: 'application/json',
            'auth-token': 'SECRET-DEV-KEY', //TODO: replace this with the actual
            ...headers
        },
        body,
    });
    return await response.json();
}