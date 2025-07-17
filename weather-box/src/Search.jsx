import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import "./Search.css";

import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SunnyIcon from "@mui/icons-material/Sunny";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from "@mui/icons-material/Cloud";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Infobox from "./Infobox";

function Search() {
  let [clicked, setClicked] = useState(false);
  let [degree, setDegree] = useState("Celcius");
  let [city, setCity] = useState("");
  let [data, setData] = useState({
    temp: "",
    temp_min: "",
    temp_max: "",

    feels_like: "",
    weather: { main: "" },

    humidity: "",

    pressure: "",
    visibility: "",

    wind: {
      wind_speed: "",
      wind_deg: "",
      wind_gust: "",
    },

    rain: "",
    clouds: "",
    sunrise: "",
    sunset: "",
  });

  let api_key = "326af3d09cb8a7fa8058c3002ea2a7cf";
  const api_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`;

  let getNewCity = (event) => {
    setCity(event.target.value);
  };

  const getCoordinates = async () => {
    setClicked(true);
    let resp = await fetch(api_url);
    let jsonResp = await resp.json();
    console.log(jsonResp[0].lat);
    console.log(jsonResp[0].lon);

    let lat = jsonResp[0].lat;
    let lon = jsonResp[0].lon;
    // setCoord({
    //   lat:jsonResp[0].lat,
    //   lon:jsonResp[0].lon
    // });

    // console.log(coord);

    getWeather(lat, lon);
    // getWeather();
    // setClicked(false);
  };

  const kelvinToCelcius = (k) => k - 273.15;

  const CelciusToFarenheit = (c) => (9 * c) / 5 + 32;

  const getWeather = async (lat, lon) => {
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

    let weatherResp = await fetch(weather_url);
    let jsonWeatherResp = await weatherResp.json();
    console.log(jsonWeatherResp);

    setData({
      temp: kelvinToCelcius(jsonWeatherResp.main.temp).toFixed(2),
      temp_min: kelvinToCelcius(jsonWeatherResp.main.temp_min).toFixed(2),
      temp_max: kelvinToCelcius(jsonWeatherResp.main.temp_max).toFixed(2),
      humidity: jsonWeatherResp.main.humidity,
      feels_like: kelvinToCelcius(jsonWeatherResp.main.feels_like).toFixed(2),
      weather: {
        main: jsonWeatherResp.weather[0].main,
      },
      wind: {
        wind_speed: jsonWeatherResp.wind.speed,
        wind_deg: jsonWeatherResp.wind.deg,
        wind_gust: jsonWeatherResp.wind.gust,
      },
      visibility: jsonWeatherResp.visibility,
      pressure: jsonWeatherResp.main.pressure,
      rain: jsonWeatherResp.rain,
      clouds: jsonWeatherResp.clouds,
      sunrise: jsonWeatherResp.sys.sunrise,
      sunset: jsonWeatherResp.sys.sunset,
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log(city);
    await getCoordinates();
  };

  let handleDegreeChange = () => {
    if (degree === "Celcius") {
      setDegree("F");
      setData({
        temp: CelciusToFarenheit(data.temp).toFixed(2),
        temp_min: CelciusToFarenheit(data.temp_min).toFixed(2),
        temp_max: CelciusToFarenheit(data.temp_max).toFixed(2),
        humidity: data.humidity,
        feels_like: CelciusToFarenheit(data.feels_like).toFixed(2),
        weather: {
          main: data.weather.main,
        },
        wind: {
          wind_speed: jsonWeatherResp.wind.speed,
          wind_deg: jsonWeatherResp.wind.deg,
          wind_gust: jsonWeatherResp.wind.gust,
        },
        visibility: jsonWeatherResp.visibility,
        pressure: jsonWeatherResp.main.pressure,
        rain: jsonWeatherResp.rain,
        clouds: jsonWeatherResp.clouds,
        sunrise: jsonWeatherResp.sys.sunrise,
        sunset: jsonWeatherResp.sys.sunset,
      });
    } else {
      setDegree("Celcius");
      setData({
        temp: kelvinToCelcius(
          data.temp * (5 / 9) - 32 * (5 / 9) + 273.15
        ).toFixed(2),
        temp_min: kelvinToCelcius(
          data.temp_min * (5 / 9) - 32 * (5 / 9) + 273.15
        ).toFixed(2),
        temp_max: kelvinToCelcius(
          data.temp_max * (5 / 9) - 32 * (5 / 9) + 273.15
        ).toFixed(2),
        humidity: data.humidity,
        feels_like: kelvinToCelcius(
          data.feels_like * (5 / 9) - 32 * (5 / 9) + 273.15
        ).toFixed(2),
        weather: {
          main: data.weather.main,
        },
        wind: {
          wind_speed: jsonWeatherResp.wind.speed,
          wind_deg: jsonWeatherResp.wind.deg,
          wind_gust: jsonWeatherResp.wind.gust,
        },
        visibility: jsonWeatherResp.visibility,
        pressure: jsonWeatherResp.main.pressure,
        rain: jsonWeatherResp.rain,
        clouds: jsonWeatherResp.clouds,
        sunrise: jsonWeatherResp.sys.sunrise,
        sunset: jsonWeatherResp.sys.sunset,
      });
    }
  };

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString("en-IN");

  function degToCompass(deg) {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  }

  return (
    <div
      className="weather-container min-w-screen min-h-screen p-0 m-0 backdrop-blur-lg bg-black/30"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/images/${
          data.weather.main || "weather"
        }.jpg)`,
        backgroundSize: "cover",
        
      }}
    >
      <div className="p-10 mx-20">
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <TextField
              id="outlined-basic"
              label="Enter Place"
              variant="outlined"
              required
              value={city}
              onChange={getNewCity}
              sx={{
                input: { color: "white", fontSize: "1.5rem" }, // <-- text inside input
                label: { color: "white" }, // <-- label text
                fieldset: { borderColor: "white" },
              }}
            />
            <button type="submit" onClick={getCoordinates}>
              <SendIcon />
            </button>
          </form>
        </div>

        {clicked == true && city && (
          <div>
            <div className="flex justify-between mt-10">
              <div className="">
                <div className="flex justify-between gap-5">
                  <p className="font-bold text-5xl">
                    {" "}
                    {data.temp} {degree == "Celcius" ? "°C" : "°F"}
                  </p>
                  <Button
                    onClick={handleDegreeChange}
                    className=""
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      backgroundColor: "#00000",
                      borderColor: "white",
                      fontSize: "1.5rem", // equivalent to text-xs
                      padding: "1px",
                      width: "2px",
                      borderLeft:"1px solid rgba(255, 255, 255, 0.4)",
                       borderRadius: 0,
                      "&:hover": {
                        backgroundColor: "#222",
                        
                      },
                    }}
                  >
                    {degree === "Celcius" ? "°F" : "°C"}
                  </Button>
                </div>
                <p className="mt-2 text-lg">
                  {" "}
                  Feels Like: {data.feels_like}{" "}
                  {degree == "Celcius" ? "°C" : "°F"}{" "}
                </p>
                <p className="text-sm mt-4">
                  {" "}
                  <b>Min :</b> {data.temp_min} {degree == "Celcius" ? "°C" : "°F"}
                </p>
                <p className="text-sm">
                  {" "}
                  <b>Max :</b> {data.temp_max} {degree == "Celcius" ? "°C" : "°F"}
                </p>
              </div>

              <div className="">
                <div className="text-sm flex gap-2 items-center mb-5">
                  <WaterDropIcon />
                  <div className="flex flex-col">
                    Humidity:
                    <span className="font-bold text-3xl">{data.humidity}%</span>
                  </div>
                </div>

                <div className="text-sm flex gap-2 items-center mb-5">
                  <CloudQueueIcon />
                  <div className="flex flex-col">
                    Air Pressure:
                    <span className="font-bold text-3xl">{data.pressure}</span>
                  </div>
                </div>

                <div className="text-sm flex gap-2 items-center mb-5">
                  <VisibilityIcon />
                  <div className="flex flex-col">
                    Visibility:
                    <span className="font-bold text-3xl">
                      {data.visibility / 1000} km
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">      
            <Infobox icon={<SunnyIcon/>} info="Sunrise" data={formatTime(data.sunrise)}/>
            <Infobox icon={<WbTwilightIcon />} info="Sunset" data={formatTime(data.sunset)}/>
            <Infobox icon={<ThunderstormIcon/>} info="Rain" data={<p>(last 1h): <br/> {data.rain?.["1h"] ?? "0"} mm</p>}/>
            <Infobox icon={<CloudIcon/>} info="Cloudiness" data={<p> {data.clouds?.all}%</p>}/>
            <Infobox icon={<AirIcon/>} info="Wind Speed" data={<p>{(data.wind.wind_speed * 3.6).toFixed(2)} km/h </p>}/>
            <Infobox icon={<AirIcon/>} info="Wind Gust" data={<p>{data.wind.wind_gust
                ? (data.wind.wind_gust * 3.6).toFixed(1) + " km/h"
                : "N/A"}</p>}/>
            <Infobox icon={<AirIcon/>} info="Wind Direction" data={<p>{data.wind.wind_deg}° (
              {degToCompass(data.wind.wind_deg)}) </p>}/>
            </div>  

          
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
