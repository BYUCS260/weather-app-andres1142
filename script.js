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
        const div = document.getElementById('weatherResults')
        fetch(todayWeather)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
            //html tags
            const h2 = document.createElement('h2')
            const h3 = document.createElement('h3')
            const img = document.createElement('img')
            const p = document.createElement('p')

            //City name
            h2.classList.add('city_name')
            h2.textContent = 'Weather in ' + json.name
            //Img
            const imgDiv = document.createElement('div')
            for (let i = 0; i < json.weather.length; i++) {
                img.src = 'http://openweathermap.org/img/w/' + json.weather[i].icon + '.png'
            }
            img.classList.add('weather-img')
            imgDiv.append(img)
            imgDiv.classList.add('img_container')

            //Temperature
            h3.textContent = json.main.temp

            //Description
            let results = '';
            for (let i = 0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            p.innerText = results
            p.classList.add('description')

            div.append(h2)
            div.append(imgDiv)
            div.append(h3)
            div.append(p)
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