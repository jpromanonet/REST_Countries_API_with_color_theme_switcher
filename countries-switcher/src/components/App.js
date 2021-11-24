import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import "./App.scss";
import Dashboard from "./Dashboard/Dashboard";
import CountryDetails from "./CountryDetails/CountryDetails";
import NotFound from "./NotFoundPage/NotFound";

class App extends Component {
    constructor(props) {
        super(props);

        this.homePage =
            process.env.NODE_ENV === "development"
                ? "/"
                : "/countries-switcher";
    }
    state = {
        darkMode: true,
        totalCountries: []
    };

    appModeChanger = () => {
        this.setState(prevState => ({ darkMode: !prevState.darkMode}));
    };

    componentDidMount() {
        axios
            .get(`https://raw.githubusercontent.com/sinamoraddar/REST-Countries-API-with-color-theme-switcher--API/master/all.json`)
            .then(res => {
                this.setState(() => ({
                    totalCountries: res.data
                }));
            })
    }
}