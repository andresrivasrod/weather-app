const titleElement = document.getElementById("mainTitle");
const inputElement = document.getElementById("mainInput");
const buttonElement = document.getElementById("searchButton");
const resultsContainerElem = document.getElementById("results");

const API_ID = "debf191272430eb7fdda2a9a5ce21501";

function printResults(data) {
    const { main, sys, wind, name, weather } = data;
    const { humidity, pressure, temp } = main;
    const { country } = sys;
    const { speed } = wind;
    const { description, icon, main: weatherMain } = weather[0];
  
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
                  <p class="value">${temp} °C</p>
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
  
    inputElement.value = ""; // Limpiar el contenido del input después de mostrar los resultados
  }
  

buttonElement.addEventListener("click", async () => {
  const { value } = inputElement;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${API_ID}&q=${value}&units=metric`
    );
    const data = await response.json();
    printResults(data);
  } catch (error) {
    console.log("ERROR", error);
  }
});