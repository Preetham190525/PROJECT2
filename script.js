async function getWeather() {
  const city = document.getElementById("city").value;
  const weatherInfo = document.getElementById("weather-info");
  const apiKey = "YOUR_API_KEY"; // Replace with your actual OpenWeatherMap API key

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod === "404") {
      weatherInfo.innerHTML = "<p>City not found. Please try again.</p>";
      return;
    }

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherInfo.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${icon}" alt="${data.weather[0].description}">
      <p>${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = "<p>Something went wrong. Try again later.</p>";
  }
}
