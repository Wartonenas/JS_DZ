async function fetchDataAndRender() {
	try {
		const response = await fetch('user.json');
		const data = await response.json();
		document.querySelector('.name1').textContent = data[0].name;
		document.querySelector('.age1').textContent = data[0].age;
		document.querySelector('.name2').textContent = data[1].name;
		document.querySelector('.age2').textContent = data[1].age;
	} catch (error) {
		console.log(error);
	}
}
fetchDataAndRender();