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
				window.open(resource.url || resource.repository, "_blank");
			});
		}

		credits.appendChild(div);
	});

	document.getElementById("credits").style.display = null;
}

window.addEventListener("load", event => {
	fetch("data.json").then(resp => resp.json()).then(resp => {
		document.title = `${resp.serverName} Credits`;
		document.getElementById("server-name").innerText = resp.serverName;
		showCredits(resp.resourceInfo)
	});
});
