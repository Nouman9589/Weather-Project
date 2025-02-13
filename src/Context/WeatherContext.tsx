import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of the weather data
interface WeatherData {
  city: string;
  temperature: number;
  chanceOfRain: number;
  realFeel: number;
  uvIndex: number;
  windSpeed: number;
  dailyForecast: Array<{
    day: string;
    temperature: number;
    condition: string;
  }>;
  hourlyForecast: Array<{
    time: string;
    temperature: number;
    condition: string;
  }>;
}

// Define the context type for the weather context
interface WeatherContextType {
  weather: WeatherData | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  fetchWeather: (city: string) => Promise<WeatherData | null>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  error: string | null;
  city: string;
}

// Create the context
export const WeatherContext = createContext<WeatherContextType | null>(null);

// WeatherProvider component
const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("");

  // Attempt to load data from localStorage on component mount
  React.useEffect(() => {
    const storedWeather = localStorage.getItem("weatherData");

    if (storedWeather) {
      try {
        const parsedWeather = JSON.parse(storedWeather) as WeatherData;
        if (parsedWeather.dailyForecast && parsedWeather.hourlyForecast) {
          setWeather(parsedWeather);
        }
      } catch (err) {
        console.error("Failed to parse weather data from localStorage", err);
      }
    }
  }, []);

  const fetchWeather = async (city: string): Promise<WeatherData | null> => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = "c35b1a6b1891fee170dd53861f40cadc";
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!weatherResponse.ok || !forecastResponse.ok)
        throw new Error("City not found");

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      const today = new Date();
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      // Format daily forecast
      const dailyForecast = dayNames.map((_, index) => ({
        day: dayNames[(today.getDay() + index) % 7], // Correct usage
        temperature: Math.round(weatherData.main.temp + index * 2),
        condition: index === 0 ? "Sunny" : index % 2 === 0 ? "Cloudy" : "Rainy",
      }));
// Format hourly forecast
const currentDateTime = new Date();
const hourlyForecast = forecastData.list
  .filter((hour: any) => {
    const forecastTime = new Date(hour.dt * 1000); // Convert timestamp to Date
    return forecastTime > currentDateTime; // Only include future hours
  })
  .slice(0, 8) // Limit to the next 8 hours
  .map((hour: any) => {
    const forecastTime = new Date(hour.dt * 1000);
    const time = `${forecastTime.getHours().toString().padStart(2, '0')}:00`; // Format time as HH:00
    return {
      time,
      temperature: Math.round(hour.main.temp),
      condition: hour.weather[0].main, // Weather condition
    };
  });


      const formattedWeather: WeatherData = {
        city: weatherData.name,
        temperature: Math.round(weatherData.main.temp),
        chanceOfRain: weatherData.clouds.all,
        realFeel: Math.round(weatherData.main.feels_like),
        uvIndex: 3, // Placeholder (API doesn't provide this directly)
        windSpeed: Math.round(weatherData.wind.speed),
        dailyForecast,
        hourlyForecast,
      };

      setWeather(formattedWeather);
      localStorage.setItem("weatherData", JSON.stringify(formattedWeather)); // Save to localStorage
      return formattedWeather;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        fetchWeather,
        setCity,
        loading,
        error,
        city,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook for using weather context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeather must be used within WeatherProvider");
  return context;
};

export default WeatherProvider;
