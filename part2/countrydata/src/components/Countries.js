import axios from "axios";
import React, { useState, useEffect } from "react";

const Country = ({ country }) => {
    const [tmp, setTemperature] = useState({ data: false });

    const name = country.name.common;
    const capital = country.capital[0];
    const population = country.population;
    const languages = Object.values(country.languages);
    const flag = country.flags["png"];

    useEffect(() => {
        console.log("Using effect");
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
            )
            .then((response) => {
                setTemperature({ data: true, ...response.data.current });
            });
    }, [capital]);

    return (
        <div>
            <h2>{name}</h2>
            <div>capital {capital}</div>
            <div>population {population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={flag} alt={`Flag of ${name}`} />
            {tmp.data && (
                <>
                    <h3>Wheather in {capital}</h3>

                    <div>
                        <strong>temperature:</strong> {tmp.temperature} Celsius
                    </div>
                    <img
                        src={tmp.weather_icons[0]}
                        alt={`Wheather in ${capital}`}
                    />
                    <div>
                        <strong>wind:</strong> {tmp.wind_speed} mph direction{" "}
                        {tmp.wind_dir}
                    </div>
                </>
            )}
        </div>
    );
};

const Countries = ({ countries, showCountry }) => {
    return (
        <div>
            {countries.length > 10 ? (
                <p>Too many matches, specicfy another filter</p>
            ) : countries.length !== 1 ? (
                countries
                    .sort(({ name: { common: a } }, { name: { common: b } }) =>
                        a > b ? 1 : a < b ? -1 : 0
                    )
                    .map(({ name: { common } }) => (
                        <div key={common}>
                            {common}{" "}
                            <button value={common} onClick={showCountry}>
                                show
                            </button>
                        </div>
                    ))
            ) : (
                <Country country={countries.pop()} />
            )}
        </div>
    );
};

export default Countries;
