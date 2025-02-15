import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { useWeather } from "../Context/WeatherContext";
import { FaSun, FaCloud, FaCloudRain } from "react-icons/fa";

const CitiesPage = () => {
  const { fetchWeather } = useWeather();
  const [cityInput, setCityInput] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [selectedCity, setSelectedCity] = useState<string | null>("Mingora");
  const [selectedCityWeather, setSelectedCityWeather] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const getWeatherIcon = (condition: string | undefined) => {
    if (!condition)
      return <FaCloud className="text-gray-400 text-3xl transition-colors" />;
    if (condition === "Sunny")
      return <FaSun className="text-yellow-400 text-3xl transition-colors" />;
    if (condition === "Cloudy")
      return <FaCloud className="text-gray-300 text-3xl transition-colors" />;
    if (condition === "Rainy")
      return (
        <FaCloudRain className="text-blue-400 text-3xl transition-colors" />
      );
    return <FaCloud className="text-gray-400 text-3xl transition-colors" />;
  };

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await fetchWeather(city);
      if (weather && weather.city) {
        setSelectedCityWeather(weather);
        setError(null);
      } else {
        setError("City not available");
        setSelectedCityWeather(null);
      }
    } catch (err) {
      setError("City not available");
      setSelectedCityWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity]);

  const handleSearch = async () => {
    if (!cityInput.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const weather = await fetchWeather(cityInput);
      if (weather && weather.city) {
        setSelectedCity(cityInput);
        setCityInput("");
        if (!favorites.includes(cityInput)) {
          setFavorites((prev) => [...prev, cityInput]);
        }
      } else {
        setError("City not available");
      }
    } catch (err) {
      setError("City not available");
    } finally {
      setLoading(false);
    }
  };

  const handleCityClick = (city: string) => {
    if (city !== selectedCity) {
      setSelectedCity(city);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 min-h-screen">
      {/* Left Section */}
      <div className="lg:w-[60%] w-full space-y-6">
        <div className="flex items-center gap-3">
          <input
            className="bg-gray-900 text-white rounded-2xl py-4 w-full px-6 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-lg backdrop-blur-sm"
            type="text"
            placeholder="Search city..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-500 text-white transition-colors shadow-lg font-medium"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add City"}
          </button>
        </div>

        {/* City Cards */}
        <div className="space-y-4">
          {favorites.map((city, index) => (
            <div
              key={index}
              className={`flex justify-between items-center bg-gray-900 backdrop-blur-sm text-white rounded-2xl p-8 shadow-lg hover:bg-gray-700/50 transition-all cursor-pointer ${
                selectedCity === city
                  ? "ring-2 ring-blue-500/50 bg-gray-700/50"
                  : ""
              }`}
              onClick={() => handleCityClick(city)}
            >
              <div className="text-3xl font-semibold tracking-tight">
                {city}
              </div>
              {selectedCity === city && (
                <div className="text-blue-400 font-medium">Selected</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-[40%] w-full space-y-6">
        {error ? (
          <div className="bg-red-500/10 text-red-400 p-6 rounded-2xl backdrop-blur-sm">
            {error}
          </div>
        ) : selectedCityWeather ? (
          <>
            {/* Main City Weather */}
            <div className="bg-gray-900 backdrop-blur-sm text-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">
                    {selectedCityWeather.city}
                  </h1>
                  <p className="text-gray-400 font-medium">
                    Current Temperature
                  </p>
                  <div className="text-5xl font-bold text-blue-400">
                    {selectedCityWeather.temperature}°C
                  </div>
                </div>
                <div className="flex items-center justify-center w-24 h-24 bg-gray-700/50 rounded-2xl backdrop-blur-sm">
                  {getWeatherIcon(selectedCityWeather.weatherCondition)}
                </div>
              </div>
            </div>

            {/* Today's Forecast */}
            <div className="bg-gray-900 backdrop-blur-sm text-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg font-semibold mb-6">Today's Forecast</p>
              <div className="flex justify-between">
                {selectedCityWeather.dailyForecast
                  .slice(0, 3)
                  .map(
                    (
                      forecast: {
                        time:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                        condition: string | undefined;
                        temperature:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                      },
                      index: Key | null | undefined
                    ) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-3"
                      >
                        <div className="text-sm font-medium text-gray-400">
                          {forecast.time}
                        </div>
                        <div className="w-16 h-16 bg-gray-700/50 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          {getWeatherIcon(forecast.condition)}
                        </div>
                        <div className="text-xl font-bold text-blue-400">
                          {forecast.temperature}°C
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>

            {/* 3-Day Forecast */}
            <div className="bg-gray-900 backdrop-blur-sm text-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg font-semibold mb-6">3-Day Forecast</p>
              <div className="space-y-4">
                {selectedCityWeather.dailyForecast
                  .slice(0, 3)
                  .map((forecast: { day: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; temperature: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; condition: string | undefined; }, index: Key | null | undefined) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm"
                    >
                      <div className="space-y-1">
                        <p className="text-gray-400 font-medium">
                          {forecast.day}
                        </p>
                        <p className="text-2xl font-bold text-blue-400">
                          {forecast.temperature}°C
                        </p>
                      </div>
                      {getWeatherIcon(forecast.condition)}
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-400 text-lg font-medium text-center p-8">
            Select a city to view weather details
          </div>
        )}
      </div>
    </div>
  );
};

export default CitiesPage;
