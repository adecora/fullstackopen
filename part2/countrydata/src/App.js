import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filterCountry, setFilterCountry] = useState("");

    const countriesToShow = !filterCountry
        ? countries
        : countries.filter((country) =>
              country.name.common.toLowerCase().includes(filterCountry)
          );

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setCountries(response.data);
        });
    }, []);

    const handleFilterCountry = (event) => {
        setFilterCountry(event.target.value.toLowerCase());
    };

    return (
        <div>
            <div>
                find countries{" "}
                <input value={filterCountry} onChange={handleFilterCountry} />
            </div>

            <Countries countries={countriesToShow} />
        </div>
    );
};

export default App;
