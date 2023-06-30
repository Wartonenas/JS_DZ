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