const apiKey = "9a77856faef290c98bd894d1d1940136";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let cityElement = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let input = document.querySelector(".search input");
let btn = document.querySelector(".search div");
let weatherImg = document.querySelector(".mainImg");
let error = document.querySelector(".error");
let weatherContainer = document.querySelector(".weather");
let loads = document.querySelector(".load");

let flag = false;

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if(response.status >= 400) {
            error.style.display = "block";
            weatherContainer.style.display = "none";
            load();
        } else {
            const data = await response.json();
            error.style.display = "none";

            cityElement.innerText = data.name;
            temp.innerHTML = `${Math.round(data.main.temp)} <span>°C</span>`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${data.wind.speed} Km/h`;

            const weatherMain = data.weather[0].main;
            if(weatherMain === "Clouds") {
                weatherImg.src = "images/clouds.png";
            } else if(weatherMain === "Clear") {
                weatherImg.src = "images/clear.png";
            } else if(weatherMain === "Drizzle") {
                weatherImg.src = "images/drizzle.png";
            } else if(weatherMain === "Mist") {
                weatherImg.src = "images/mist.png";
            } else if(weatherMain === "Rain") {
                weatherImg.src = "images/rain.png";
            }
            load();
            weatherContainer.style.display = "block";
        }
    } catch (err) {
        console.log("Error fetching the weather data: ", err);
        error.style.display = "block";
        weatherContainer.style.display = "none";
    }
}

function load() {
    if(flag === true) {
        flag = false;
        loads.style.display="none";
    } else {
        flag = true;
        loads.style.display="block";

    }
}

btn.addEventListener("click", () => {
    load();
    checkWeather(input.value);
});

input.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        load();
        checkWeather(input.value);
    }
});
