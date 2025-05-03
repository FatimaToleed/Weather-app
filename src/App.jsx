import React, { useState } from 'react';
import './App.css';
import './index.css';
import CurrentWeather from './components/currentweather';
import WeeklyForecast from './components/weeklyforecast';

function App() {
  const [city, setCity] = useState('');
  const [searchedCity, setSearchedCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    current: { temperature: '--', description: 'Search for weather', icon: '' },
    weekly: [],
  });

  const handleSearch = async () => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }

    setSearchedCity(city);

    const apiKey = import.meta.env.VITE_API_KEY; // OpenWeatherMap API key
    const baseURL = 'https://api.openweathermap.org/data/2.5';

    try {
      const currentWeatherResponse = await fetch(
        `${baseURL}/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      );

      if (!currentWeatherResponse.ok) {
        throw new Error('City not found or invalid API key');
      }

      const currentWeather = await currentWeatherResponse.json();
      console.log('Current Weather Data:', currentWeather);
      
      // Fetch 5-day forecast data
      const forecastResponse = await fetch(
        `${baseURL}/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error('Error fetching forecast data');
      }

      const forecast = await forecastResponse.json();
      console.log('Forecast Data:', forecast);
      // Update state with real data
      setWeatherData({
        current: {
          temperature: currentWeather.main.temp,
          icon: currentWeather.weather[0].icon,
        },
        weekly: forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((day) => ({
          day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }), 
          temperature: `${day.main.temp}°C`, 
          icon: day.weather[0].icon, 
        })),
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="weather-app">
      <main>
        <section className="search">
          <input
            type="text"
            placeholder="Enter your city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </section>
        <CurrentWeather
          city={searchedCity}
          temperature={`${weatherData.current.temperature}°C`}
          icon={weatherData.current.icon} 
          description={weatherData.current.description}  
        />
        <WeeklyForecast forecast={weatherData.weekly} />
      </main>
    </div>
  );
}

export default App;
