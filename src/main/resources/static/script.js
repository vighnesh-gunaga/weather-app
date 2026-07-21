async function getWeather() {

const cityInput = document.getElementById("cityInput");

const weatherResult = document.getElementById("weatherResult");

const loading = document.getElementById("loading");


// Get city name

const city = cityInput.value.trim();


// Validate input

if (city === "") {

    weatherResult.innerHTML =
    <div class="error">
        <i class="fa-solid fa-triangle-exclamation"></i>
    Please enter a city or town name.
</div>;

    return;

}


// Clear previous result

weatherResult.innerHTML = "";


// Show loading

loading.classList.remove("hidden");


try {

    // Call Spring Boot backend

    const response = await fetch(
        `http://localhost:8081/api/weather?city=${encodeURIComponent(city)}`
        );


    // Check response

    if (!response.ok) {

        throw new Error(
            "Weather information not found for this location."
        );

    }


    // Convert JSON response

    const weather = await response.json();


    // Hide loading

    loading.classList.add("hidden");


    // Get weather condition

    const condition = weather.description.toLowerCase();


    // Default icon

    let weatherIcon = "fa-cloud";


    // Select icon based on weather

    if (condition.includes("clear")) {

        weatherIcon = "fa-sun";

    }

    else if (
        condition.includes("rain") ||
        condition.includes("drizzle")
    ) {

        weatherIcon = "fa-cloud-rain";

    }

    else if (condition.includes("thunder")) {

        weatherIcon = "fa-cloud-bolt";

    }

    else if (condition.includes("snow")) {

        weatherIcon = "fa-snowflake";

    }

    else if (condition.includes("cloud")) {

        weatherIcon = "fa-cloud";

    }


    // Display weather

    weatherResult.innerHTML = `

        <div class="weather-card">

            <h2>
                ${weather.city}
            </h2>


            <p class="location-name">

                <i class="fa-solid fa-location-dot"></i>

                Current Weather

            </p>


            <!-- Weather Icon -->

            <div class="weather-icon">

                <i class="fa-solid ${weatherIcon}"></i>

            </div>


            <!-- Temperature -->

            <div class="temperature">

                ${Math.round(weather.temperature)}°C

            </div>


            <!-- Weather Condition -->

            <div class="condition">

                ${weather.description}

            </div>


            <!-- Weather Information -->

            <div class="weather-info">


                <!-- Feels Like -->

                <div class="info-card">

                    <i class="fa-solid fa-temperature-half"></i>

                    <p>
                        Feels Like
                    </p>

                    <strong>

                        ${weather.feelsLike}°C

                    </strong>

                </div>


                <!-- Humidity -->

                <div class="info-card">

                    <i class="fa-solid fa-droplet"></i>

                    <p>
                        Humidity
                    </p>

                    <strong>

                        ${weather.humidity}%

                    </strong>

                </div>


                <!-- Wind Speed -->

                <div class="info-card">

                    <i class="fa-solid fa-wind"></i>

                    <p>
                        Wind Speed
                    </p>

                    <strong>

                        ${weather.windSpeed} m/s

                    </strong>

                </div>


                <!-- Condition -->

                <div class="info-card">

                    <i class="fa-solid fa-cloud"></i>

                    <p>
                        Condition
                    </p>

                    <strong>

                        ${weather.description}

                    </strong>

                </div>


            </div>

        </div>

    `;


}

catch (error) {


    // Hide loading

    loading.classList.add("hidden");


    // Show error message

    weatherResult.innerHTML = `

        <div class="error">

            <i class="fa-solid fa-circle-exclamation"></i>

            ${error.message}

        </div>

    `;

}


}



function handleEnter(event) {


if (event.key === "Enter") {

    getWeather();

}
}