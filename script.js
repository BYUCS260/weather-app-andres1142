document.getElementById('today-option').addEventListener('click', function (event) {
    event.preventDefault();
    getData(1)
})
document.getElementById('5-day-option').addEventListener('click', function (event) {
    event.preventDefault();
    getData(5)
})

async function getData(days) {
    const value = document.getElementById('weatherInput').value
    const todayWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=55734c8cfa3cc8323f8edf524f8730cf"
    const weekWeather = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=55734c8cfa3cc8323f8edf524f8730cf"

    document.getElementById('weatherResults').textContent = ''
    document.getElementById('forecastResults').textContent = ''

    if (days === 1) {
        fetch(todayWeather)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
            let results = "";
            results += '<h2 = class="city-name">Weather in ' + json.name + "</h2>";
            for (let i = 0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>' + json.main.temp + " &deg;F</h2>"
            results += "<p>"
            for (let i = 0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += "</p>";
            document.getElementById("weatherResults").innerHTML = results;

        });
    } else {
        fetch(weekWeather)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
            let forecast = "";
            for (let i = 0; i < json.list.length; i++) {
                forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
                forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
            }
            document.getElementById("forecastResults").innerHTML = forecast;
        });
    }
}