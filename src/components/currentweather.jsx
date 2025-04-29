import React from 'react';

function CurrentWeather({city, temperature, icon}) {
    return (
        <div className='current-weather'>
            <h2>{city}</h2>
            <h2>{temperature}</h2>
            <img className="weather-icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon' />
        </div>
    );
}

export default CurrentWeather;