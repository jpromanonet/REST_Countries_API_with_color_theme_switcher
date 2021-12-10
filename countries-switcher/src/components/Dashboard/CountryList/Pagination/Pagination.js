import React, { useContext } from "react";
// Styles
import styles from "./Pagination.module.scss";
// Context
import { AppContext } from "../../../../contexts/AppContext";

const scroll = (scrollTo) => {
    scrollTo.current.scrollIntoView({behavio: "smooth"});
}

// Constants
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

const onSetCurrentPage = (
    setCurrentPage, 
    currentPage,
    pageNumberChangingStatus,
    scrollTo
) => {
    switch (pageNumberChangingStatus){
        case INCREMENT: {
            scroll(scrollTo);
            setCurrentPage(currentPage + 1);
            break;
        }

        case DECREMENT: {
            scroll(scrollTo);
            setCurrentPage(currentPage -1);
            break;
        }
        default:
            break;
    }
};

// supplementary components
const paginationOfFirstAndLastPage = (
    currentPage,
    totalPages,
    setCurrentPage,
    scrollTo
) => {
    return (
        <>
            <button
                onClick={
                    currentPage + 1 === totalPages
                        ? () => {
                            setCurrentPage(0);
                            scroll(scrollTo);
                        }
                    : undefined
                }
                className={currentPage === 0 ? styles.isActive : undefined}
            >
                1
            </button>
    )
}