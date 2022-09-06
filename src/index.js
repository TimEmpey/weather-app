import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
  const response = JSON.parse(this.responseText);
  if (this.status === 200) {
    printElements(response, city);
  } else if (this.status === 400) {
    printError(this, city);
  } else if (this.status === 401) {
    printError(this, city);
  }  else if (this.status === 403) {
    printError(this, city);
  }  else if (this.status === 404) {
    printError(this, city);
  }  else if (this.status === 500) {
    printError(this, city);
  }
  });

request.open("GET", url, true);
request.send();
}

function printError(request, city) {
  document.getElementById('weatherResponse').innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}`;
  console.log(city);
}

function printElements(apiResponse, city) {
  let ferTemp = Math.round(1.8 * (apiResponse.main.temp - 273) + 32);
  document.getElementById('weatherResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Fahrenheit is ${ferTemp} degrees.
  The cloudiness is ${apiResponse.clouds.all}%`
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});