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

async function post(endpoint, body, json) {
    return network(endpoint, 'POST', body, null, json);
}

async function patch(endpoint, body) {
    return network(endpoint, 'PATCH', body, null, true);
}

function get(endpoint) {
    return network(endpoint, 'GET');
}

async function network(endpoint, method, body, additionalHeaders, json) {
    const response = await fetch(API_URL + endpoint, {
        method,
        headers: {
            'Content-Type': json ? 'application/json' : '',
            Accept: 'application/json',
            'auth-token': 'SECRET-DEV-KEY', //TODO: replace this with the actual
            ...additionalHeaders
        },
        body: body || null,
    });
    return await response.json();
}