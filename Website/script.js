const API_URL = 'https://github-stats.jodu555.de/';

let lastChange;

(async () => {
	loadLastChange();
})();

async function loadLastChange() {
	const response = await fetch(API_URL + 'api/lastCommit/Jodu555/ez-uploader.de');
	const json = await response.json();
	lastChange = json.data.info.lastUpdated;
}

setInterval(() => {
	animateCountDown('last-change-', lastChange);
}, 1000);

function animateCountDown(prefix, till) {
	const now = Date.now();
	const diff = now - till;

	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	document.querySelector('#' + prefix + 'day').innerText = Math.floor(diff / day);
	document.querySelector('#' + prefix + 'hour').innerText = Math.floor((diff % day) / hour);
	document.querySelector('#' + prefix + 'minute').innerText = Math.floor((diff % hour) / minute);
	document.querySelector('#' + prefix + 'second').innerText = Math.floor((diff % minute) / second);
}
