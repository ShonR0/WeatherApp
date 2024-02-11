import "./WeatherApp.css";
import search_icon from "../../assets/images/search.png"
import clear_icon from "../../assets/images/clear.png"
import cloudy_icon from "../../assets/images/cloudy.png"
import drizzle_icon from "../../assets/images/drizzle.png"
import humidity_icon from "../../assets/images/humidity.png"
import rain_icon from "../../assets/images/rain.png"
import snow_icon from "../../assets/images/snow.png"
import wind_icon from "../../assets/images/wind.png"
import { useState } from "react";

function WeatherApp(): JSX.Element {

    let api_key = "a83bb631e75e43122649030ed6c7e98f";
    const [wicon, setWicon] = useState(cloudy_icon);

    const search = async () => {
        const elements = document.getElementsByClassName("cityInput");
        if (elements.length > 0 && (elements[0] as HTMLInputElement).value === "") {
            return 0;
        }
        const city = (elements[0] as HTMLInputElement).value;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            let data = await response.json();
            
            const updateElement = (className: string, text: string) => {
                const elem = document.getElementsByClassName(className);
                if (elem.length > 0) {
                    elem[0].innerHTML = text;
                }
            };
    
            updateElement("humidity-percent", data.main.humidity + " %");
            updateElement("wind-rate", Math.floor(data.wind.speed) + " km/h");
            updateElement("weather-temp", Math.floor(data.main.temp) + "°C");
            updateElement("weather-location", data.name);

            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setWicon(snow_icon);
            } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setWicon(cloudy_icon);
            } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setWicon(drizzle_icon);
            } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
                setWicon(drizzle_icon);
            } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setWicon(rain_icon);
            } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                setWicon(rain_icon);
            } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                setWicon(snow_icon);
            } else {
                setWicon(clear_icon);
            }

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className="WeatherApp">
			<div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search"/>
                <div className="search-icon" onClick={()=>{search()}}>
                    <img style={{width:'30px'}} src={search_icon} alt="search icon" />
                </div>
            </div>
            <div className="weather-image">
                <img src={ wicon } alt="weather image"/>
            </div>
            <div className="weather-temp">--</div>
            <div className="weather-location">Enter City Name</div>
            <div className="data-container">
                <div className="element">
                    <img src={ humidity_icon } alt="" className="icon"/>
                    <div className="data">
                        <div className="humidity-percent">-- %</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={ wind_icon } alt="" className="icon"/>
                    <div className="data">
                        <div className="wind-rate">-- km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
