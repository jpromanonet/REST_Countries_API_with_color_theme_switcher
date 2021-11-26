import React, {Component} from "react";
import axios from "axios";
import Numeral from "numeral";
import { Link, Redirect } from "react-router-dom";
import styles from "./CountryDetails.module.scss";
import NavBar from "../NavBar/Navbar";
import Loading from "../Loading/Loading";
import BorderCountries from "./BorderCountries/BorderCountries";

class CountryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryDetails: null,
            notFoundStatus: false
        };
    }

    // Redirect function
    onRedirect = () => {
        return this.state.redirect && <Redirect to="/404" />;
    }

    // Let's get the country details
    fetchCountryDetails = () => {
        axios
            .get(
                `https://raw.githubusercontent.com/sinamoraddar/REST-Countries-API-with-color-theme-switcher--API/master/all.json`
            )
            .then(response => {
                const tempoCountryDetails = response.data.find(
                    country => country.name === this.props.match.params.countryName
                );
                if (tempoCountryDetails){
                    this.setState(() => ({
                        countryDetails: tempoCountryDetails
                    }));
                } else {
                    this.setState(() => ({ countryDetails: true, notFoundStatus: true}));
                }
            })
            .catch(error => console.log(error));
    };

    componentDidMount() {
        document.title = this.props.match.params.countryName;
        this.fetchCountryDetails();
    }
    componentDidUpdate(prevProps) {
        document.title = this.props.match.params.countryName;
        if(prevProps.location.key !== this.props.location.key){
            this.fetchCountryDetails();
        }
    }

    render() {
        const { darkMode, appModeChanger, totalCountries, homePage } = this.props;
        const { countryDetails, notFoundStatus } = this.state;
        return (
            <React.Fragment>
                <header
                    className={`${styles.countryDetails} ${darkMode ? `dark` : `light`}`}    
            >
                <NavBar
                    darkMode={darMode}
                    homePage={homePage}
                    appModeChanger={appModeChanger}
                />
                <Link
                    to={homePage}
                    className={`${styles.backButton} ${
                        darkMode ? "dark darkElements" : "Light lightElements"
                    }`}
                >
                    <i className="fas fa-arrow-left"></i>
                </Link>
            </header>
            <main
                className={`${styles.countryDetails} ${styles.main} ${
                    darkMode ? `dark` : `light`
                }`}
            >
                {}
                { CountryDetails ? (
                    notFoundStatus ? (
                        <p className={styles.error}>
                            Sorry, we don't have any idea about the thing you're looking for...
                        </p>
                    ) : (
                        <React.Fragment>
                            <div className={styles.error}>
                                
                            </div>
                        </React.Fragment>
                    )
                )}
            </main>
            </React.Fragment>
        )
    }
    
}