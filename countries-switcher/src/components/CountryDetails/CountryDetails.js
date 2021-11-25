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

    
}