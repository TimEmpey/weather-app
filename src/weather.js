export default function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
  const response = JSON.parse(this.responseText);
  if (this.status === 200) {
    printElements(response, city);
  }
  });


request.open("GET", url, true);
request.send();
}