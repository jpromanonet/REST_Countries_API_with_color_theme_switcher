import React, { useState, useEffect } from "react";
import CountryItem from "./CountryItem/CountryItem";
import Loading from "../../Loading/Loading";
import Pagination from "./Pagination/Pagination";
import styles from "./CountryList.module.scss";

// Let's create the country items
const countryItemCreator = (filteredCountries, currentPage, darkMode, homePage) => {
    // create the items by mapping over the filtered countries
    return filteredCountries
        .slice(currentPage * 8, currentPage * 8 + 8)
        .map(country => (
            <CountryItem Key={country.name} {...country} darkMode={darkMode} homePage={homePage} />
        ));
};

// Component declaration
