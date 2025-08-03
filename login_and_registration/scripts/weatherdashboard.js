const apiKey = "62c2bf6f5fd050701630fcac8d0d443f";
const city = "Balanga, PH";

async function getWeather() {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Fetch current weather
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    // Set main info
    document.getElementById("city").textContent = weatherData.name;
    document.getElementById("temperature").textContent =
      Math.round(weatherData.main.temp) + "°C";
    document.getElementById("condition").textContent =
      weatherData.weather[0].main;

    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    document.getElementById("day").textContent = days[now.getDay()];
    document.getElementById("date").textContent = now.toLocaleDateString();
    document.getElementById("current-time").textContent =
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Fetch forecast data
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    // Build 3-hour forecast (next 8 entries = 24 hours)
    const hourlyContainer = document.getElementById("hourly-forecast");
    hourlyContainer.innerHTML = "";

    for (let i = 0; i < 8; i++) {
      const entry = forecastData.list[i];
      const time = new Date(entry.dt_txt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const temp = Math.round(entry.main.temp);

      const div = document.createElement("div");
      div.classList.add("flex-column", "forecast-time");
      div.innerHTML = `
              <p class="small mb-1">${time}</p>
              <p class="small mb-0"><strong>${temp}°C</strong></p>
            `;
      hourlyContainer.appendChild(div);
    }

    // Build daily forecast for next 7 days
    const dailyContainer = document.getElementById("daily-forecast");

    const dailyMap = new Map();
    forecastData.list.forEach((entry) => {
      const date = new Date(entry.dt_txt);
      const dayName = days[date.getDay()];
      const temp = Math.round(entry.main.temp);

      if (!dailyMap.has(dayName)) {
        dailyMap.set(dayName, temp);
      }
    });

    let count = 0;
    dailyMap.forEach((temp, day) => {
      if (count < 7) {
        const div = document.createElement("p");
        div.classList.add("pb-1");
        div.innerHTML = `<span class="pe-2">${day}</span> <strong>${temp}°</strong>`;
        dailyContainer.appendChild(div);
        count++;
      }
    });
  } catch (err) {
    console.error("Weather fetch failed:", err);
  }
}

window.onload = getWeather;
