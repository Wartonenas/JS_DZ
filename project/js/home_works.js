// MOVE BLOCK
const childBlock = document.querySelector('.child_block')

let positionX = 0
let positionY = 0

const move = () => {
	if (positionX < 449 && positionY === 0) {
		positionX += 2
		childBlock.style.left = `${positionX}px`
		setTimeout(move, 10)
	} else if (positionX >= 449 && positionY < 449) {
		positionY += 2
		childBlock.style.top = `${positionY}px`
		setTimeout(move, 10)
	} else if (positionX > 0 && positionY > 0) {
		positionX -= 2
		childBlock.style.left = `${positionX}px`
		setTimeout(move, 10)
	} else if (positionX === 0 && positionY > 0) {
		positionY -= 2
		childBlock.style.top = `${positionY}px`
		setTimeout(move, 10)
	}
}

move()

// STOPWATCH
const minutesBlock = document.querySelector('#minutes'),
	secondsBlock = document.querySelector('#seconds'),
	mlSecondsBlock = document.querySelector('#ml-seconds'),
	startButton = document.querySelector('#start'),
	stopButton = document.querySelector('#stop'),
	resetButton = document.querySelector('#reset')

let interval
let minutes = 0
let seconds = 0
let mlSeconds = 0

const startTimer = () => {
	mlSeconds++
	mlSeconds <= 99 && (mlSecondsBlock.innerHTML = mlSeconds)
	mlSeconds == 100 && (mlSecondsBlock.innerHTML = '00')

	mlSecondsBlock.innerHTML = `0${mlSeconds}`
	mlSeconds > 9 && (mlSecondsBlock.innerHTML = mlSeconds)
	if (mlSeconds > 99) {
		seconds++
		secondsBlock.innerHTML = `0${seconds}`
		mlSeconds = 0
	}
	seconds > 9 && (secondsBlock.innerHTML = seconds)
	if (seconds > 59) {
		minutes++
		minutesBlock.innerHTML = `0${minutes}`
		seconds = 0
		secondsBlock.innerHTML = `0${seconds}`
	}
	minutes > 9 && (minutesBlock.innerHTML = minutes)
}

startButton.onclick = () => {
	clearInterval(interval)
	interval = setInterval(startTimer, 10)
}

stopButton.onclick = () => {
	clearInterval(interval)
}

resetButton.onclick = () => {
	clearInterval(interval)
	minutes = 0
	seconds = 0
	mlSeconds = 0
	minutesBlock.innerHTML = '00'
	secondsBlock.innerHTML = '00'
	mlSecondsBlock.innerHTML = '00'
}

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

const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const euro = document.querySelector('#euro')

const convert = async (currency, tergetInput, inputTarget, isOp) => {
	currency.oninput = async () => {
		try {
			const response = await fetch("chainge.json");
			const data = await response.json();

			if (isOp === 1) {
				tergetInput.value = (currency.value * data.somUsd).toFixed(2);
				inputTarget.value = (currency.value * data.somEuro).toFixed(2);
			} else if (isOp === 2) {
				tergetInput.value = (currency.value * data.usdEuro).toFixed(2);
				inputTarget.value = (currency.value * data.usdSom).toFixed(2);
			} else if (isOp === 3) {
				tergetInput.value = (currency.value * data.euroSom).toFixed(2);
				inputTarget.value = (currency.value * data.euroUsd).toFixed(2);
			}

			if (currency.value === '') {
				tergetInput.value = '';
				inputTarget.value = '';
			}
		} catch (error) {
			console.error(error);
		}
	};
};

convert(som, usd, euro, 1);
convert(usd, euro, som, 2);
convert(euro, som, usd, 3);

const card = document.querySelector('.card')
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')

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

fetch('https://jsonplaceholder.typicode.com/posts')
	.then(response => response.json())
	.then(data => console.log(data))