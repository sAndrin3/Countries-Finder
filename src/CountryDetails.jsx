import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './CountryDetails.css'
import {BsArrowLeft} from 'react-icons/bs'


const CountryDetails = ({ countries }) => {
  const { id } = useParams(); // id represents the alpha3code of a country
  const [country, setCountry] = useState(null);

  useEffect(() => {
    // Find the country with matching alpha3Code
    const selectedCountry = countries.find(
      (country) => country.alpha3Code === id
    );
    // Set the country in state
    setCountry(selectedCountry);
  }, [countries, id]);

  if (!country) {
    // Display loading message if country is not yet fetched
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
    <div>
      <div className="btn">
  <button className="back-button">
    <Link to="/">
      <BsArrowLeft /> Back
    </Link>
  </button>
</div>

    <div className="country-details-container">
      
      <div className="flag-container">
        
        <img src={flag} alt={`Flag of ${name}`} className="flag-image" />
      </div>
      <div className="details-container">
        <h2>{name}</h2>
        <div className="items-container">
          <div className= "item1">
          <p><strong>Native Name: </strong>{nativeName}</p>
          <p><strong>Population: </strong>   {population}</p>
          <p><strong>Region: </strong>  {region}</p>
          <p><strong>Sub Region: </strong>  {subregion}</p>
          <p><strong>Capital: </strong>  {capital}</p>
          </div>
          <div className="item2">
            <p><strong>Top Level Domain: </strong>  {topLevelDomain}</p>
            <p>
              <strong>Currencies: </strong>  {currencies.map((currency) => currency.name).join(", ")}
            </p>
            <p>
              <strong>Languages: </strong>  {languages.map((language) => language.name).join(", ")}
            </p>
          </div>
        </div>
        <hr></hr>
        <h6><strong>Border Countries:</strong> </h6>
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
    </div>
  );
};

export default CountryDetails;
