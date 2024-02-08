import React, { useState } from "react";
import Wind from "./assets/wind.png";
import Humidty from "./assets/humidity.png";
import Visibility from "./assets/visiblity.png";
import Loading from "./assets/loading.gif";

const Weather = () => {
  const [city, setCity] = useState("");
  const [showData, setShowData] = useState();
  const [loading, setloading] = useState(false);

  const handleSubmit = (e) => {
    setloading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2636948da277ac2a4f406015a70a78b0&units=metric`
    )
      .then((res) => res.json())
      .then((finalData) => {
        if (finalData.cod === "404") {
          setShowData(undefined);
        } else {
          setShowData(finalData);
        }
        setloading(false);
      });
    if (!city.trim()) {
      return;
    }
    setCity("");
    e.preventDefault();
  };
  return (
    <div className="flex justify-center items-center h-screen bg-slate-700">
      <div className="w-96 h-auto bg-slate-300 p-2 rounded-md">
        <div>
          <h1 className="text-center p-4 mb-5 font-bold text-2xl">
            Weather App
          </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Search City"
                className="p-2 rounded-md outline-amber-600 w-60"
              />
              <button className="p-2 rounded-md bg-red-500 text-white">
                Search
              </button>
            </div>
          </form>
          {showData !== undefined ? (
            <>
              <div className="text-center p-4 relative">
                <div>
                  <img
                    src={Loading}
                    className={`absolute left-32 top-10 w-32 ${
                      loading ? "" : "hidden"
                    }`}
                    alt="loading"
                  />
                </div>
                <h1 className="font-semibold text-2xl mb-2">{showData.name}</h1>
                <div className="flex justify-center items-center ">
                  <h1 className="text-5xl">{showData.main.temp} °C</h1>
                  <img
                    src={`https://openweathermap.org/img/w/${showData.weather[0].icon}.png`}
                    alt="fog"
                    className="w-28 ml-3"
                  />
                </div>
                <p className="text-xl"> {showData.weather[0].description}</p>
              </div>

              <div className="p-4 flex justify-around items-center">
                <div className="w-24 h-24 bg-slate-200 text-center rounded-md flex justify-center items-center flex-col shadow-2xl">
                  <img src={Wind} alt="wind" className="w-12" />
                  <p className="mb-2">{showData.wind.speed} km/h Wind</p>
                </div>
                <div className="w-24 h-24 bg-slate-200 text-center rounded-md flex justify-center items-center flex-col shadow-2xl">
                  <img src={Humidty} alt="humidty" className="w-8 mt-2" />
                  <p className="p-1">{showData.main.humidity}% Humidty</p>
                </div>
                <div className="w-24 h-24 bg-slate-200 text-center rounded-md flex justify-center items-center flex-col shadow-2xl">
                  <img src={Visibility} alt="visibility" className="w-8" />
                  <p className="p-1">{showData.visibility} Visibility</p>
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-center p-5 text-xl font-semibold">
              No Data Found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
