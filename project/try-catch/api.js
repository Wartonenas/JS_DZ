let count = 1;

const fetchData = async (url) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

const updateCard = (todo) => {
	card.innerHTML = `
   	<h2>${todo.title}</h2>
   	<span>${todo.id}</span>
   	<h3>${todo.completed}</h3>
	`
};

prev.onclick = async () => {
	if (count > 1) {
		count--;
		const todo = await fetchData(`https://jsonplaceholder.typicode.com/todos/${count}`);
		updateCard(todo);
	}
};

next.onclick = async () => {
	if (count < 200) {
		count++;
		const todo = await fetchData(`https://jsonplaceholder.typicode.com/todos/${count}`);
		updateCard(todo);
	}
};