import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import DisplayCard from "./components/DisplayCard/DisplayCard";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import getJSON from "./util/getJSON";

let API = `https://api.openweathermap.org/data/2.5/forecast`;

function App() {
  const [apiData, setApiData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        const { latitude, longitude } = e.coords;

        getJSON(
          `${API}?lat=${latitude}&lon=${longitude}&units=metric&appid=f6b5ddf5d61c796f547c24db85722db8`
        ).then((response) => {
          setApiData(response);
        });
      },
      () => {
        alert(
          "Please turn ON your location services, allow the site to access your location and reload the page. Don't you worry, i'll not be visiting your home any time soon 🤣."
        );
      }
    );
  }, []);

  const changeLocationHandler = (location: { lat: string; lon: string }) => {
    getJSON(
      `${API}?lat=${location.lat}&lon=${location.lon}&units=metric&appid=f6b5ddf5d61c796f547c24db85722db8`
    ).then((response) => {
      setApiData(response);
      setIsLoading(false);
      document.getElementById("spinner-div")!.style.display = "none";
    });
  };

  return (
    <div className="App">
      <div className="container">
        {isLoading &&
          ReactDOM.createPortal(
            <Spinner />,
            document.getElementById("spinner-div")!
          )}
        {apiData.list && (
          <DisplayCard
            items={{
              dt: apiData.list[0].dt,
              temp: apiData.list[0].main.temp,
              description: apiData.list[0].weather[0].description,
              place: `${apiData.city.name}, ${apiData.city.country}`,
            }}
          />
        )}
        {apiData.list && (
          <WeatherDetails
            items={apiData.list}
            onChangeLocation={changeLocationHandler}
            loader={setIsLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;
