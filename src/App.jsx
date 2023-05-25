import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CountryList from "./CountryList";
import CountryDetails from "./CountryDetails";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [theme, setTheme] = useState("light");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    filterCountries();
  }, [selectedRegion, searchQuery]);

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleRegionFilter = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterCountries = () => {
    let filtered = countries;

    if (selectedRegion !== "All") {
      filtered = filtered.filter((country) =>
        country.region.toLowerCase().includes(selectedRegion.toLowerCase())
      );
    }

    if (searchQuery !== "") {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <header>
          <nav>
            <h1 className="navbar-title">
              <Link to="/">Where in the world?</Link>
            </h1>
            <button onClick={handleThemeChange}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </nav>
        </header>
        <div className="filters-container">
          <input
            type="text"
            placeholder="Search for a country..."
            className="search-box"
            onChange={handleSearch}
          />
          <select
            className="filter-select"
            value={selectedRegion}
            onChange={handleRegionFilter}
          >
            <option value="Filter by Region">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <Routes>
          <Route path="/" element={<CountryList countries={filteredCountries} />} />
          <Route path="/country/:id" element={<CountryDetails countries={countries} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
