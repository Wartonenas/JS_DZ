// REG EXP
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
	if (regExp.test(phoneInput.value)) {
		phoneResult.innerHTML = 'YOUR NUMBER IS VALID!'
		phoneResult.style.color = 'green'
	} else {
		phoneResult.innerHTML = 'YOUR NUMBER IS NOT VALID'
		phoneResult.style.color = 'red'
	}
}

// TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')
let index = 0

const hideTabContent = () => {
	tabContent.forEach((item) => {
		item.style.display = 'none'
	})
	tabs.forEach((item) => {
		item.classList.remove('tab_content_item_active')
	})
}

const showTabContent = (i = 0) => {
	tabContent[i].style.display = 'block'
	tabs[i].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent(index)

const autoTab = (i = 0) => {
	setInterval(() => {
		i++
		if (i > tabs.length - 1) {
			i = 0
		}
		hideTabContent()
		showTabContent(i)
	}, 3000)
}

tabsParent.onclick = (event) => {
	if (event.target.classList.contains('tab_content_item')) {
		tabs.forEach((item, i) => {
			if (event.target === item) {
				hideTabContent()
				showTabContent(i)
			}
		})
	}
}

autoTab(index)

const cityName = document.querySelector('.cityName');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const apiKey = 'e417df62e04d3b1b111abeab19cea714';

const fetchWeatherData = async (cityName) => {
	try {
		const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const updateWeatherInfo = (data) => {
	city.innerHTML = data?.name || 'Город не найден...';
	temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
};

const citySearch = () => {
	cityName.oninput = async (event) => {
		const data = await fetchWeatherData(cityName.value);
		updateWeatherInfo(data);
	};
};

citySearch();