import React from "react";

const Country = ({ country }) => {
    const name = country.name.common;
    const capital = country.capital[0];
    const population = country.population;
    const languages = Object.values(country.languages);
    const flag = country.flags["png"];

    return (
        <div>
            <h2>{name}</h2>
            <div>capital {capital}</div>
            <div>population {population}</div>
            <h3>languages</h3>
            <ul>
                {languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={flag} alt={`Flag of ${name}`} />
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
