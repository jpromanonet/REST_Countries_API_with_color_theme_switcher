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
            <button 
                onclick={
                    currentPage + 1 === 1
                        ? () => {
                            setCurrentPage(totalPages - 1);
                            scroll(scrollTo);
                        }
                    : undefined
                }
                className = {currentPage + 1 === totalPages ? styles.isActive : undefined}
            >
                {totalPages}
            </button>
        </>
    );
};

const paginationForSecondAndOneBeforeLastPage = (
    currentPage,
    totalPages,
    setCurrentPage,
    scrollTo
) => {
    return (
        <>
            <button
                onClick={() => {
                    setCurrentPage(0);
                    scroll(scrollTo);
                }}
            >
                1
            </button>
            {currentPage + 1 === 2 ? (
                <>
                    <button className={styles.isActive}>2</button>
                    <button className={styles.ellipsis}>
                        <i className="fas fas-ellipsis-h" />
                    </button>
                </>
            ) : (
                <React.Fragment>
                    <button className={styles.ellipsis}>
                        <i className="fas fa-ellipsis-h"/>
                    </button>
                    <button className={styles.isActive}>{totalPages - 1}</button>
                </React.Fragment>
            )}
            <button
                onClick{() => {
                    setCurrentPage(totalPages - 1);
                    scroll(scrollTo);
                }}
            >
                {totalPages}
            </button>
        </>
    );
};

const paginationMiddleSectionCreator = (
    currentPage,
    totalPages,
    setCurrentPage,
    scrollTo
) => {
    if(totalPages === 1){
        return <button className={styles.isActive}>1</button>
    }
    switch (currentPage + 1) {
        case 1:
        case totalPages: {
            return paginationOfFirstAndLastPage(
                currentPage,
                totalPages,
                setCurrentPage,
                scrollTo
            );
        }
    }
}