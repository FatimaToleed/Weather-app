import React from 'react';

function WeeklyForecast({ forecast }) {
  return (
    <div className="weekly-forecast">
      {forecast.map((day, index) => (
        <div key={index} className="day"> 
          <p>{day.day}</p>
          <p>{day.temperature}</p>
          <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="weather icon" /> 
        </div>
      ))}
    </div>
  );
}

export default WeeklyForecast;
