const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const night = ['01n', '02n', '03n','04n','09n','10n','11n','13n','50n'];
const Snow = ['light snow', 'heavy snow','snow','sleet','light shower sleet','shower sleet','light rain and snow','rain and snow','light shower snow', 'shower snow','heavy shower snow',];
const Rain = ['light rain','moderate rain','heavy intensity rain','very heavy rain','extreme rain','freezing rain','light intensity shower rain', 'shower rain','heavy intensity shower rain','ragged shower rain'];
const Clouds = ['few clouds', 'scattered clouds','broken clouds', 'overcast clouds'];
const Thunderstorm = ['thunderstorm with light rain','	thunderstorm with rain','thunderstorm with heavy rain','light thunderstorm','thunderstorm', 'heavy thunderstorm','ragged thunderstorm','thunderstorm with light drizzle','thunderstorm with drizzle','thunderstorm with heavy drizzle'];
const Drizzle = ['light intensity drizzle','drizzle','heavy intensity drizzle','light intensity drizzle rain', 'drizzle rain', 'heavy intensity drizzle rain','shower rain and drizzle','heavy shower rain and drizzle','shower drizzle'];
const Atmosphere = ['mist','smoke','haze','sand/dust whirls','fog','sand','dust','volcanic ash','squalls','tornado'];

let weather = {
    apiKey: '49cc8c821cd2aff9af04c9f98c36eb74',
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=" +
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
      let des = "";
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity,pressure,feels_like,temp_min,temp_max} = data.main;
      const { speed } = data.wind;

      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°F";
      document.querySelector(".High").innerText =
        "High: " + temp_max + "°F";
        document.querySelector(".Low").innerText =
        "Low: " + temp_min + "°F";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
        document.querySelector(".feelsLike").innerText =
        "Feels Like: " + feels_like + "°F";
        document.querySelector(".pressure").innerText =
        "Pressure: " + pressure + " hPa";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " mph";
      document.querySelector(".weather").classList.remove("loading");

      if(description == 'clear sky'){
        des = 'clearsky.gif'
        if(night.includes(icon)){
            des = 'clearskynight.gif'
        }
        }  
        
        if(Clouds.includes(description)){
            des = 'cloudy.gif'
            if(night.includes(icon)){
                des = 'scatteredcloudsnight.gif'
            }
            }  
 
                if(Rain.includes(description)){
                    des = 'lightrain.gif'
                    if(night.includes(icon)){
                        des = 'rainnight.gif'
                    }
                    }  

                    if(Thunderstorm.includes(description)){
                        des = 'thunderstorm.gif'
                        if(night.includes(icon)){
                            des = 'thunderstormnight.gif'
                        }
                        }  

                        if(Snow.includes(description)){
                            des = 'snow.gif'
                            if(night.includes(icon)){
                                des = 'snownight.gif'
                            }
                            }  
        
                            if(Drizzle.includes(description)){
                                des = 'drizzle.gif'
                                if(night.includes(icon)){
                                    des = 'drizzlenight.gif'
                                }
                                }  

                                if(Atmosphere.includes(description)){
                                    des = 'fog.gif'
                                    if(night.includes(icon)){
                                        des = 'fognight.gif'
                                    }
                                    }  
            
                                   
      document.body.style.backgroundImage =
      "url('"+ des+"')";

      document.body.style.backgroundSize = "cover"; 

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
  
  weather.fetchWeather("Chantilly, US");
