const titleElement = document.getElementById("mainTitle");
const inputElement = document.getElementById("mainInput");
const buttonElement = document.getElementById("searchButton");
const resultsContainerElem = document.getElementById("results");
const citiesListElem = document.getElementById("cities");
const API_ID = "debf191272430eb7fdda2a9a5ce21501";

function convertTemperature(temp, unit) {
  switch (unit) {
    case 'metric':
      return `${temp} °C`;
    case 'imperial':
      return `${temp} °F`;
    case 'standard':
      return `${temp} K`;
    default:
      return `${temp} °C`;
  }
}

function printResults(data, unit) {
  const { main, sys, wind, name, weather } = data;
  const { humidity, pressure, temp } = main;
  const { country } = sys;
  const { speed } = wind;
  const { description, icon, main: weatherMain } = weather[0];

  const temperature = convertTemperature(temp, unit);

  resultsContainerElem.innerHTML = `
    <section class="results-box">
      <div class="result-item">
        <p class="title">City</p>
        <p class="value">${name}, ${country}</p>
      </div>
      <div class="result-item">
        <p class="title">Weather</p>
        <p class="value">${weatherMain} - ${description}</p> <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
      </div>
      <div class="result-item">
        <p class="title">Humidity</p>
        <p class="value">${humidity}%</p>
      </div>
      <div class="result-item">
        <p class="title">Temperature</p>
        <p class="value">${temperature}</p>
      </div>
      <div class="result-item">
        <p class="title">Pressure</p>
        <p class="value">${pressure} hPa</p>
      </div>
      <div class="result-item">
        <p class="title">Wind Speed</p>
        <p class="value">${speed} m/s</p>
      </div>
    </section>
  `;

  inputElement.value = "";
}

buttonElement.addEventListener("click", async () => {
  const { value } = inputElement;
  const tempUnitElement = document.getElementById("tempUnit");
  const tempUnit = tempUnitElement.value;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${API_ID}&q=${value}&units=${tempUnit}`
    );
    const data = await response.json();
    printResults(data, tempUnit);
  } catch (error) {
    console.log("ERROR", error);
  }
});

inputElement.addEventListener("input", async () => {
  const { value } = inputElement;

  if (value.length < 3) {
    citiesListElem.innerHTML = "";
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=5&appid=${API_ID}`);
    const data = await response.json();

    citiesListElem.innerHTML = "";

    data.list.forEach(city => {
      const option = document.createElement("option");
      option.value = `${city.name}, ${city.sys.country}`;
      citiesListElem.appendChild(option);
    });
  } catch (error) {
    console.log("ERROR", error);
  }
});
