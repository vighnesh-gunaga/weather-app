async function getWeather() {

    const city = document.getElementById("cityInput").value;

    if (city.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:8081/api/weather?city=${encodeURIComponent(city)}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const weather = await response.json();

        document.getElementById("weatherResult").innerHTML = `
            <h2>${weather.city}</h2>
            <br>
            <p>🌡️ Temperature: ${weather.temperature} °C</p>
            <br>
            <p>🌡️ Feels Like: ${weather.feelsLike} °C</p>
            <br>
            <p>💧 Humidity: ${weather.humidity}%</p>
            <br>
            <p>☁️ Condition: ${weather.description}</p>
            <br>
            <p>💨 Wind Speed: ${weather.windSpeed} m/s</p>
        `;

    } catch (error) {

        document.getElementById("weatherResult").innerHTML = `
            <p>${error.message}</p>
        `;
    }
}