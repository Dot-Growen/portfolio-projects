import React from 'react';

import CityForm from './components/CityForm'
import axios from 'axios'
import { useState } from 'react';
import Message from './components/Message';
import 'antd/dist/antd.css';

function App() {

  // const query = "chicago";
  const apiKey = "bb6c7f28a851255adc62d57a7753f64e";
  const unit = "imperial";
  // const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  const [temp, setTemp] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(city) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
      .then(res => {
        console.log(res.data)
        setTemp(res.data.main.temp)
        setWeatherDesc(res.data.weather[0].description)
        setIcon(res.data.weather[0].icon)
      })
      .catch(err => {
        setError(err.message || err)
      })
  }

  const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  return (
    <div>
      {error && <Message message={error} />}
      <CityForm cityName={handleSubmit} />
      <h1 className="text-white"></h1>
      {temp && (
        <div className="weather-card">
          {icon ? <img src={imageURL} /> : null}
          <h1 className="text-white">{temp}</h1>
          <h2 className="text-white">{weatherDesc}</h2>
          <p>{}</p>
        </div>
      )}
    </div>
  );
}

export default App;
