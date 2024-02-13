import { useState } from "react";
import { HourWeatherResponse } from "./WeatherContext";
import { ForecastWeatherResponse } from "./WeatherContext";

export default function Home() {

  const [showCityName, setShowCityName] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [city, setCity] = useState("");

  function responseLog() {
    fetchHourWeather().then((response) => {
      setHourWeather(response)
      setShowCityName(true);
      setShowExtra(true);
    })
    fetchWeatherForecast().then((response) => {
      setWeatherForecast(response)
    })
  }

  const [hourWeather, setHourWeather] = useState<HourWeatherResponse>();
  const [weatherForecast, setWeatherForecast] = useState<ForecastWeatherResponse>();

  async function fetchHourWeather(): Promise<HourWeatherResponse> {
    const apiKey = '01e286d64cc5dab9d9135b756d38e78f';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data: HourWeatherResponse = await response.json();
    return data;
  }

  async function fetchWeatherForecast(): Promise<ForecastWeatherResponse> {
    const apiKey = '01e286d64cc5dab9d9135b756d38e78f';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const data: ForecastWeatherResponse = await response.json();
    return data;
  }

  return (
    <div>
      <main style={{
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}>

        <header style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          padding: "20px",
          justifyContent: "space-evenly",
          backgroundColor: "#3b3b3b",
          borderRadius: "0px 0px 30px 30px"
        }}>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingBottom: "20px" }}>
            <img src="/images/logo.png" style={{ width: "250px", }} alt="SkyTrackers" />
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            textAlign: "center",
          }}>

            <input placeholder="Search Weather" type="text" value={city} onChange={e => setCity(e.target.value)} style={{
              width: "200px",
              height: "15px",
              minHeight: "15px",
              minWidth: 125,
              padding: "10px",
              fontSize: "16px",
              borderRadius: "20px 0px 0px 20px",
              borderWidth: "4px",
              borderColor: "lightblue",
            }}>
            </input>

            <button onClick={responseLog} style={{
              width: "100px",
              height: "42px",
              minHeight: 40,
              minWidth: 60,
              padding: "10px",
              fontSize: "18px",
              backgroundColor: "lightblue",
              borderRadius: "0px 20px 20px 0px",
              borderColor: "white",
              borderWidth: "3px",
              color: "black",
              borderStyle: "solid"
            }}>Search</button>
          </div>
        </header>

        <h1 style={{
          fontSize: "52px",
          paddingTop: "50px",
          fontFamily: "fantasy",
          fontWeight: "normal"
        }}>Your Weather Source</h1>

        <div style={{ marginTop: "20px", paddingRight: "10px", paddingBottom: "25px" }}>
          {showCityName && <h1 style={{
            textTransform: "capitalize",
            backgroundColor: "lightblue",
            minWidth: "110%",
            borderColor: "black",
            borderWidth: "4px",
            borderStyle: "solid",
            borderRadius: 30,
          }}>{city}</h1>}
        </div>

        <div>
          {showCityName && <h1>Hourly Forecast</h1>}
        </div>

        {showExtra && (<div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 20,
          borderRadius: 20,
          maxWidth: "100%",
          maxHeight: "100%",
          alignItems: "center",
          textAlign: "center",
          marginBottom: 50,
          marginTop: 50,
          backgroundColor: "lightblue",
          borderColor: "black",
          borderWidth: "10px",
          borderStyle: "solid"
        }}>
          <p style={{ fontSize: "34px", paddingRight: "10px" }}>{hourWeather?.dt ? new Date(hourWeather?.dt * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : ""}</p>
          {hourWeather?.weather[0].main && (
            <div>
              {hourWeather?.weather[0].main === "Clear" && <img src="/images/sun.png" width={200} alt="Sunny" />}
              {hourWeather?.weather[0].main === "Rain" && <img src="/images/rain.png" width={200} alt="Rainy" />}
              {hourWeather?.weather[0].main === "Clouds" && <img src="/images/cloud.png" width={200} alt="Cloudy" />}
              {hourWeather?.weather[0].main === "Snow" && <img src="/images/snow.png" width={200} alt="Snowy" />}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", paddingLeft: "30px" }}>
            <h3 style={{ fontSize: "18px", }}>{hourWeather?.weather[0].main}</h3>
            <h3 style={{ fontSize: "18px" }}>{hourWeather?.main.temp.toFixed(1)}°C</h3>
            <h3 style={{ fontSize: "18px" }}>{hourWeather?.wind.speed}km/h</h3>
          </div>
        </div>)}

        <div>
          <div>
            {showCityName && <h1 style={{ paddingBottom: "40px" }}>5 Day Forecast</h1>}
          </div>
          {weatherForecast?.list.slice(0, 5).map((item, index) => (
            <div key={index} style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              padding: 20,
              borderRadius: 30,
              maxWidth: "100%",
              maxHeight: "100%",
              alignItems: "center",
              textAlign: "center",
              marginBottom: 20,
              backgroundColor: "#706bff",
              borderColor: "black",
              borderWidth: "10px",
              borderStyle: "solid"
            }}>
              <p style={{ fontSize: "34px", paddingRight: "10px" }}>{new Date(new Date().getTime() + (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              {item.weather[0].main && (
                <div>
                  {item.weather[0].main === "Clear" && <img src="/images/sun.png" width={200} alt="Sunny" />}
                  {item.weather[0].main === "Rain" && <img src="/images/rain.png" width={200} alt="Rainy" />}
                  {item.weather[0].main === "Clouds" && <img src="/images/cloud.png" width={200} alt="Cloudy" />}
                  {item.weather[0].main === "Snow" && <img src="/images/snow.png" width={200} alt="Snowy" />}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", paddingLeft: "30px" }}>
                <h3 style={{ fontSize: "18px" }}>{item.weather[0].main}</h3>
                <h3 style={{ fontSize: "18px", textTransform: "capitalize" }}>{item.weather[0].description}</h3>
                <h3 style={{ fontSize: "18px" }}>{item.main.temp.toFixed(1)}°C</h3>
                <h3 style={{ fontSize: "18px" }}>{item.wind.speed}km/h</h3>
              </div>
            </div>
          ))}
        </div>
        <footer style={{ position: "relative", bottom: "0" }}>
          <h4>2024 Jesse Welk ©</h4>
        </footer>
      </main>
    </div>
  );
}