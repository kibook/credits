function showCredits(resourceInfo) {
	let credits = document.getElementById("credits-list-body");

	credits.innerHTML = "";

	resourceInfo.forEach(resource => {
		let nameDiv = document.createElement("div");
		nameDiv.innerHTML = resource.name || resource.resourceName;

		let descrDiv = document.createElement("div");
		descrDiv.innerHTML = resource.description || "";

		let versionDiv = document.createElement("div");
		versionDiv.innerHTML = resource.version || "";

		let authorDiv = document.createElement("div");
		authorDiv.innerHTML = resource.author || "";

		credits.appendChild(nameDiv);
		credits.appendChild(descrDiv);
		credits.appendChild(versionDiv);
		credits.appendChild(authorDiv);
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
		case "hide":
			hideCredits();
			break;
		default:
			break;
	}
});
