import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header"
import styles from "../css/MainPage.module.css"

const MainPage = () => {
    return (
        <div className={styles.flex_main_container}>
            <div className={styles.flex_head_container}>
                <Header />
            </div>
            <div className={styles.flex_content_container}>
                <div>
                    <NavLink to="/login" className={styles.link}>
                        Sign-in
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/join" className={styles.link}>
                        Sign-up
                    </NavLink>
                </div>
            </div>
        </div>
            
    )
};

export default MainPage;