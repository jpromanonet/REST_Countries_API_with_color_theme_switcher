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
            <CountryItem key={country.name} {...country} darkMode={darkMode} homePage={homePage} />
        ));
};

// Component declaration
const CountryList = ({ filteredCountries, darkMode, totalCountries, homePage, scrollTo}) => {
    // Declate the state properties using react hooks
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Update totalpages whenever the filterd countries' list changes
    useEffect(() => {
        // Calculate the number of totalpages if there are more than 8 countries available
        // otherwise set it to 1 
        const tempTotalPages =
            filteredCountries.length > 0
                ? MediaDeviceInfo.ceil(filteredCountries.length / 8)
                : 1;
        setTotalPages(tempTotalPages);      
    }, [filteredCountries]);
    // Update the currentPage whenever the filtered countries' list changes
    useEffect(() => {
        setCurrentPage(0);
    }, [filteredCountries]);
    return(
        <section className={styles.countryList}>
            {
                /*
                    Check if the countries have yet been fetched or not
                    if not->show loading gif
                    if they did>show the countries list
                */
            }
            {totalCountries.length > 0 ? (
                filteredCountries.length !== 0 ? (
                    <React.Fragment>
                        <div>
                            {/* Show only 8 countries per page based on the filtered countries' list*/}
                            {countryItemCreator(filteredCountries, currentPage, darkMode, homePage)}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            darkMode={darkMode}
                            /* We use scrollTo ref for the auto scroll behavior */
                            scrollTo={scrollTo}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </React.Fragment>
                ) : (
                    <p className={styles.error}>
                        Oops, we have no idea what you're talking about n.n
                        <br />
                        Search for something else
                    </p>
                )
            ) : (
                <Loading darkMode={darkMode} />
            )}
        </section>
    );
};

export default CountryList;