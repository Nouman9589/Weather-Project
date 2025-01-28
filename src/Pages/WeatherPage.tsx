import { useState, useEffect } from "react";
import { useWeather } from "../Context/WeatherContext";
import { FaSun, FaCloud, FaCloudRain, FaWind } from "react-icons/fa";
import useCitySuggestions from "../Hooks/Usecitysuggestions";

const WeatherPage = () => {
  const { fetchWeather, loading, error, weather, setCity } = useWeather();
  const [city, setCityInput] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { citySuggestions, error: suggestionsError } = useCitySuggestions(city);

  const handleSearch = async () => {
    if (city.trim()) {
      await fetchWeather(city);
      setCity(city);
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = async (selectedCity: string) => {
    setCityInput(selectedCity);
    await fetchWeather(selectedCity);
    setCity(selectedCity);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (!weather) {
      fetchWeather("mingora");
    }
  }, [fetchWeather, weather]);

  return (
    <div className="text-white p-6 font-sans   overflow-hidden">
      {/* Search Section */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCityInput(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search for cities..."
          className="p-3 w-full md:w-[60%] bg-gray-900 text-white rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-300 backdrop-blur-sm"
          aria-label="City search input"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-500 active:bg-blue-700 ml-2 transition-all duration-300 shadow-lg hover:shadow-blue-600/25"
          aria-label="Search button"
        >
          Search
        </button>
      </div>

      {/* City Suggestions Dropdown */}
      {city && showSuggestions && citySuggestions.length > 0 && (
        <div className="relative">
          <ul className="absolute bg-gray-900 backdrop-blur-sm mt-2 w-full max-h-60 overflow-y-auto rounded-xl shadow-xl border border-gray-700 z-10">
            {citySuggestions.map((cityItem, index) => (
              <li
                key={index}
                onClick={() => handleCitySelect(cityItem.city)}
                className="p-3 hover:bg-gray-700/50 cursor-pointer first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
              >
                {cityItem.city}
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestionsError && <p className="text-red-400 font-medium">{suggestionsError}</p>}

      {/* Main Weather Display */}
      {loading && <p className="text-lg text-yellow-400 animate-pulse">Loading...</p>}
      {error && <p className="text-red-400 text-lg font-bold bg-red-500/10 p-4 rounded-xl">{error}</p>}
      {weather && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-4">
            {/* Current Weather */}
            <div className="bg-gray-900 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-700/50">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{weather.city}</h1>
              <div className="text-6xl font-extrabold mt-2">
                {weather.temperature}°
              </div>
              <p className="text-lg mt-2 text-gray-300">
                Chance of rain: {weather.chanceOfRain}%
              </p>
            </div>

            {/* Today's Forecast */}
            <div className="bg-gray-900 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-700/50">
              <h2 className="text-2xl font-semibold">
                Today's Hourly Forecast
              </h2>
              <div className="flex flex-wrap justify-between mt-4">
                {weather?.hourlyForecast.map((forecast, index) => (
                  <div key={index} className="p-3 bg-gray-700/30 rounded-lg text-center">
                    <p className="text-gray-300">{forecast.time}</p>
                    <p className="font-medium mt-1">{forecast.condition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Air Conditions */}
            <div className="bg-gray-900 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-700/50">
              <h2 className="text-2xl font-semibold">Air Conditions</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                  <p className="text-xl font-semibold text-gray-300">Real Feel</p>
                  <p className="text-2xl mt-1">{weather.realFeel}°</p>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                  <p className="text-xl font-semibold text-gray-300">Wind Speed</p>
                  <p className="text-xl mt-1">
                    {weather.windSpeed} km/h{" "}
                    <FaWind className="inline text-gray-400" />
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                  <p className="text-xl font-semibold text-gray-300">UV Index</p>
                  <p className="text-2xl mt-1">{weather.uvIndex}</p>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                  <p className="text-xl font-semibold text-gray-300">Chance of Rain</p>
                  <p className="text-2xl mt-1">{weather.chanceOfRain}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-gray-900 backdrop-blur-sm w-full md:w-72 ml-0 md:ml-12 p-6 rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-700/50">
            <h2 className="text-2xl font-semibold">7-Day Forecast</h2>
            <ul className="space-y-3 mt-4">
              {weather.dailyForecast.map((day, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-lg p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-300">{day.day}</span>
                  <span className="font-bold">{day.temperature}°</span>
                  <span className="text-xl">
                    {day.condition === "Sunny" && (
                      <FaSun className="text-yellow-500" />
                    )}
                    {day.condition === "Cloudy" && (
                      <FaCloud className="text-gray-400" />
                    )}
                    {day.condition === "Rainy" && (
                      <FaCloudRain className="text-blue-400" />
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;