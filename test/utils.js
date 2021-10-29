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