let notifTimeout;

function copyToClipboard(text) {
	var e = document.createElement('textarea');
	e.textContent = text;
	document.body.appendChild(e);

	var selection = document.getSelection();
	selection.removeAllRanges();

	e.select();
	document.execCommand('copy');

	selection.removeAllRanges();
	e.remove();
}

function notify(message) {
	clearTimeout(notifTimeout);

	let notifDiv = document.getElementById('notification');

	notifDiv.innerHTML = message;
	notifDiv.style.display = "block";

	notifTimeout = setTimeout(() => {
		notifDiv.style.display = "none";
		notifDiv.innerHTML = "";
	}, 3000);
}

function showCredits(resourceInfo) {
	let credits = document.getElementById("credits-list");

	credits.innerHTML = "";

	resourceInfo.forEach(resource => {
		if (!(resource.author || resource.version || resource.url)) {
			return;
		}

		let div = document.createElement("div");
		div.className = "credit";

		div.innerHTML += `<strong>${resource.name || resource.resourceName}</strong>`;

		if (resource.version) {
			div.innerHTML += ` ${resource.version}`;
		}

		if (resource.author) {
			if (Array.isArray(resource.author)) {
				div.innerHTML += ` by ${resource.author.join(", ")}`;
			} else {
				div.innerHTML += ` by ${resource.author}`;
			}
		}

		let linkDiv = document.createElement("div");

		if (resource.url || resource.repository) {
			div.className += " link";
			div.addEventListener("click", event => {
				copyToClipboard(resource.url || resource.repository);
				notify("URL copied to clipboard!");
			});
		}

		credits.appendChild(div);
	});

	document.getElementById("credits").style.display = null;
}

function hideCredits() {
	document.getElementById("credits").style.display = "none";
}

window.addEventListener("message", event => {
	switch (event.data.type) {
		case "show":
			showCredits(event.data.resourceInfo);
			break;
		default:
			break;
	}
});

window.addEventListener("load", event => {
	document.getElementById("close").addEventListener("click", function(event) {
		hideCredits();
		fetch(`https://${GetParentResourceName()}/close`);
	});
});
