import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CountryDetails = ({ countries }) => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const selectedCountry = countries.find(
      (country) => country.alpha3Code === id
    );
    setCountry(selectedCountry);
  }, [countries, id]);

  if (!country) {
    return <div>Loading...</div>;
  }

  const {
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
    flag,
  } = country;

  return (
    <div className="country-details-container">
      <div className="flag-container">
        <img src={flag} alt={`Flag of ${name}`} className="flag-image" />
      </div>
      <div className="details-container">
        <h2>{name}</h2>
        <p>Native Name: {nativeName}</p>
        <p>Population: {population}</p>
        <p>Region: {region}</p>
        <p>Sub Region: {subregion}</p>
        <p>Capital: {capital}</p>
        <p>Top Level Domain: {topLevelDomain}</p>
        <p>
          Currencies: {currencies.map((currency) => currency.name).join(", ")}
        </p>
        <p>
          Languages: {languages.map((language) => language.name).join(", ")}
        </p>
        <p>Border Countries:</p>
        <div className="border-buttons">
          {borders.map((border) => {
            const borderCountry = countries.find(
              (country) => country.alpha3Code === border
            );
            return (
              <button key={borderCountry.alpha3Code}>
                {borderCountry.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
