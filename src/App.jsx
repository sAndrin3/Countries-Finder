import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CountryList from "./CountryList";
import CountryDetails from "./CountryDetails";
import "./App.css";

const App = () => {
  // State variables
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [theme, setTheme] = useState("light");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch country data from API on component mount
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Trigger country filtering when selectedRegion or searchQuery changes
    filterCountries();
  }, [selectedRegion, searchQuery]);

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleRegionFilter = (event) => {
    // Update selectedRegion based on the selected option in the filter dropdown
    setSelectedRegion(event.target.value);
  };

  const handleSearch = (event) => {
    // Update searchQuery based on the entered search value
    setSearchQuery(event.target.value);
  };

  const filterCountries = () => {
    // Filter countries based on selectedRegion and searchQuery
    let filtered = countries;

    if (selectedRegion !== "All") {
      // Filter by region if a specific region is selected
      filtered = filtered.filter((country) =>
        country.region.toLowerCase().includes(selectedRegion.toLowerCase())
      );
    }

    if (searchQuery !== "") {
      // Filter by country name if searchQuery is not empty
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
