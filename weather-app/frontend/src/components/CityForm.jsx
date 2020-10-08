import React, { useState } from 'react'

const CityForm = ({cityName}) => {
    const [city, setCity] = useState("");


    const handleSumbit = (e) => {
        e.preventDefault()
        cityName(city)
    }

    return (
        <div className="form-1">
            <form onSubmit={handleSumbit} className="weather-form">
            <h2 className="title">Check the weather</h2>
                <input type="text" className="form-control bottom" placeholder="Enter a City" onChange={e => setCity(e.target.value)} required />
                <button className="btn btn-lg btn-block button btn-dark" type="submit">Search</button>
                <p className="mt-2 mb-0 text-muted">&copy;  <a href="https://github.com/Dot-Growen">Lydell Tyler</a> </p>
            </form>
        </div>
    )
}

export default CityForm
