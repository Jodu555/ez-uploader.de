const API_URL = window.location.hostname == 'localhost' ? 'http://localhost:7474/' : 'https://dev.ez-uploader.de/';

function alert(selector, success, message, cb, interval) {
	const alert = document.querySelector(selector);
	alert.classList.remove('alert-success');
	alert.classList.remove('alert-danger');
	alert.classList.add(success ? 'alert-success' : 'alert-danger');
	alert.innerText = message;
	alert.style.display = '';
	setTimeout(() => {
		alert.style.display = 'none';
		if (cb) cb();
	}, interval || 5000);
}

function delSwal(title, cb) {
	Swal.fire({
		title,
		text: 'This deletion cannot be undone!',
		showDenyButton: true,
		confirmButtonText: "Yes I'am",
		denyButtonText: `No I dont`,
	}).then(cb);
}

async function post(endpoint, body, json = false) {
	return network(endpoint, 'POST', body, null, json);
}

async function patch(endpoint, body) {
	return network(endpoint, 'PATCH', body, null, true);
}

async function del(endpoint, body) {
	return network(endpoint, 'DELETE', body, null, true);
}

function get(endpoint) {
	return network(endpoint, 'GET');
}

async function network(endpoint, method, body, additionalHeaders, jsonContent) {
	const headers = {
		Accept: 'application/json',
		'auth-token': getCookie('auth-token'), //TODO: replace this with the actual
		...additionalHeaders,
	};
	if (jsonContent) headers['Content-Type'] = 'application/json';
	const response = await fetch(API_URL + endpoint, {
		method,
		headers,
		body: body || null,
	});
	const json = await response.json();
	const success = !(json.success == false);
	const returnObject = {
		success,
		error: !success ? json.error.message : '',
		json,
	};
	if (!returnObject.success && returnObject.error.includes('auth-token')) {
		// deleteCookie('auth-token');
		// window.location.reload();
	}
	return returnObject;
}
