import "./WeatherDetails.css";
import unixToStandard from "./../../util/unixToStandard";
import { FormEvent, useRef, useState } from "react";
import getJSON from "../../util/getJSON";
interface propsFormat {
  items: any[];
  onChangeLocation: Function;
  loader: Function;
}
const WeatherDetails: React.FC<propsFormat> = ({
  items,
  onChangeLocation,
  loader,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [locFormOpen, setLocFormOpen] = useState(false);
  const day1 = items[0];
  const day2 = items.find((item) => item.dt >= day1.dt + 1 * 86400);
  const day3 = items.find((item) => item.dt >= day1.dt + 2 * 86400);
  const day4 = items.find((item) => item.dt >= day1.dt + 3 * 86400);
  const day1Day = unixToStandard(day1.dt).dayLong.slice(0, 3);
  const day2Day = unixToStandard(day2.dt).dayLong.slice(0, 3);
  const day3Day = unixToStandard(day3.dt).dayLong.slice(0, 3);
  const day4Day = unixToStandard(day4.dt).dayLong.slice(0, 3);
  const svg1 = day1.weather[0].description.includes("rain")
    ? "rainy-7.svg"
    : "cloudy-day-1.svg";
  const svg2 = day2.weather[0].description.includes("rain")
    ? "rainy-7.svg"
    : "cloudy-day-1.svg";
  const svg3 = day3.weather[0].description.includes("rain")
    ? "rainy-7.svg"
    : "cloudy-day-1.svg";
  const svg4 = day4.weather[0].description.includes("rain")
    ? "rainy-7.svg"
    : "cloudy-day-1.svg";

  const changeLocationHandler = () => {
    setLocFormOpen(true);
  };
  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const place = inputRef.current!.value;
    if (!place || place === "") {
      setLocFormOpen(false);
      return;
    }
    document.getElementById("spinner-div")!.style.display = "flex";
    loader(true);
    getJSON(
      `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURI(
        place
      )}&format=json&limit=1`
    )
      .then((data) => {
        if (data.length === 0) {
          alert("City not found. Try again");
        } else {
          onChangeLocation({ lat: data[0].lat, lon: data[0].lon });
        }
      })
      .catch((err) => {
        console.log("ERRRR", err);
      });
    setLocFormOpen(false);
  };

  return (
    <div className="weatherDetails">
      <div className="details">
        <div className="question">
          <p>PRESSURE</p>
          <p>HUMIDITY</p>
          <p>WIND</p>
        </div>
        <div className="answer">
          <p>{day1.main.pressure} Pa</p>
          <p>{day1.main.humidity} %</p>
          <p>{day1.wind.speed} km/h</p>
        </div>
      </div>
      <div className="future-details">
        <div className="future-days">
          <img className="svgIconDesc" src={`./assets/icons/${svg1}`} />
          <p className="dayDesc">{day1Day}</p>
          <p className="tempDesc">{Number(day1.main.temp).toFixed(1)} °C</p>
        </div>
        <div className="future-days">
          <img className="svgIconDesc" src={`./assets/icons/${svg2}`} />
          <p className="dayDesc">{day2Day}</p>
          <p className="tempDesc">{Number(day2.main.temp).toFixed(1)} °C</p>
        </div>
        <div className="future-days">
          <img className="svgIconDesc" src={`./assets/icons/${svg3}`} />
          <p className="dayDesc">{day3Day}</p>
          <p className="tempDesc">{Number(day3.main.temp).toFixed(1)} °C</p>
        </div>
        <div className="future-days">
          <img className="svgIconDesc" src={`./assets/icons/${svg4}`} />
          <p className="dayDesc">{day4Day}</p>
          <p className="tempDesc">{Number(day4.main.temp).toFixed(1)} °C</p>
        </div>
      </div>
      <div className="change-loc">
        {!locFormOpen && (
          <button
            className="btn-change-location"
            onClick={changeLocationHandler}
          >
            Change location
          </button>
        )}
        {locFormOpen && (
          <form onSubmit={formSubmitHandler}>
            <input
              type="text"
              className="locInput"
              placeholder="Enter your city name "
              ref={inputRef}
            />
            <button
              className="btn-change-location"
              onClick={changeLocationHandler}
            >
              Yes! That's my location
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default WeatherDetails;
