async function fetchData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
async function renderCards() {
	const cardContainer = document.getElementById("card-container");
	const data = await fetchData("https://jsonplaceholder.typicode.com/posts");
	if (Array.isArray(data)) {
		data.forEach((cardData) => {
			const imageElement = document.createElement("img");
			imageElement.src = "../img/user.png";
			const cardElement = document.createElement("div");
			cardElement.classList.add("card");
			const titleElement = document.createElement("h2");
			titleElement.textContent = cardData.title;
			const descriptionElement = document.createElement("p");
			descriptionElement.textContent = cardData.body;
			cardElement.appendChild(titleElement);
			cardElement.appendChild(descriptionElement);
			cardElement.appendChild(imageElement);
			cardContainer.appendChild(cardElement);
		});
	}
}
renderCards();
