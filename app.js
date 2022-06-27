let weather = {
    apiKey: "0ae87f40a62e4eca9ab152612222201&q",
    fetchWeather: function (city) {
        fetch(
            "https://api.weatherapi.com/v1/current.json?&q=" +
            city +
            "&aqi=no&key=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const name = data.location.name;
        const temp = data.current.temp_c;
        const humidity = data.current.humidity;
        const imgUrl = data.current.condition.icon;
        const speed = data.current.wind_kph;    
        const description = data.current.condition.text;
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}-city')`;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =imgUrl;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + city + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Surat");