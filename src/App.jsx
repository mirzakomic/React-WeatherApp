import { useState, useEffect } from "react";
import "./App.css";
import sun from "./assets/img/sun.png"
import cloud from "./assets/img/cloud.png"
import cloudy from "./assets/img/cloudy.png"
import rain from "./assets/img/rain.png"
import storm from "./assets/img/storm.png"
const apiKey = import.meta.env.VITE_API_KEY

function App() {
  const [weather, setWeather] = useState();
  const [cityName, setCityName] = useState("Hamburg");

  const searchCity = (cityValueName) => {
    setCityName(cityValueName);
    console.log(cityValueName);
  };

  const [imgLink, setimgLink] = useState();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=de&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
        const weatherCondition = data.weather[0].main;
        let imgSrc = "";

        switch (weatherCondition) {
          case "Clear":
            imgSrc = sun;
            break;
          case "Clouds":
            imgSrc = cloud;
            break;
          case "Rain":
            imgSrc = rain;
            break;
          case "Thunderstorm":
            imgSrc = storm;
            break;
          default:
            imgSrc = cloudy;
        }
        setimgLink(imgSrc);

      })
      .catch((error) => {
        console.log("First Fetch error:", error);
      });
  }, [cityName]);

  return (
    <div className="App">
      <h3>A simple react weather app</h3>
      <br />
      <div className="row">
        <button onClick={() => searchCity("Berlin")}>Berlin</button>
        <button onClick={() => searchCity("Hamburg")}>Hamburg</button>
        <button onClick={() => searchCity("Köln")}>Köln</button>
        <button onClick={() => searchCity("München")}>München</button>
      </div>
      <div className="weather-data-wrap">
        <img className="img-weather" src={imgLink}/>
        <h1>{Math.round(Number(weather && weather.main.temp - 273.15))} °C</h1>
        <h2>{cityName}</h2>
        <p>{weather && weather.weather[0].main}</p>
      </div>
      <a href="https://www.flaticon.com/packs/weather-158" title="cloud icons">Freepik - Flaticon</a>
    </div>
  );
}

export default App;
