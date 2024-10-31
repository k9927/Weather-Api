var photo=$(".weather-icon img");
var temperature=$(".temperature-value p")
var desc=$(".temperature-description p");
var locationElem=$(".location p");
var SearchButton=$("button");
var CityInput=$(".cityInput")
var apiKey="6028b210194fd1fe0e434d468eababf3";
$(".search-icon").on("click", function() {
    if (CityInput.val().trim() !== '') {
        updateWeatherinformation(CityInput.val());
    }
});

CityInput.on("keydown",function(event){
     if(event.key=="Enter"&&CityInput.val()!='')
     {
       updateWeatherinformation(CityInput.val());
     }
    
});
async function getFetchData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6028b210194fd1fe0e434d468eababf3`;
    var response=await fetch(apiUrl);
    return response.json();
    };
    async function updateWeatherinformation(city){
        var WeatherData = await getFetchData(city);
        console.log("Weather Data:", WeatherData);
        if (WeatherData && WeatherData.sys && WeatherData.sys.country) {
            var {
                sys: { country },
                main: { temp },
                weather: [{ icon, description }]
            } = WeatherData;
    
            const temperatureInCelsius = Math.floor(temp - 273.15);
            temperature.text(`${temperatureInCelsius} °C`.toUpperCase());
            locationElem.text(`${capitalizeFirstLetter(city)}, ${country.toUpperCase()}`);
            desc.text(capitalizeFirstLetter(description));
            photo.attr("src", `./Photos/${icon}.png`);
        } else {
            locationElem.text("Location not found");
            desc.text("Description not available");
            temperature.text("-");
        }
    }
    
    
function capitalizeFirstLetter(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}