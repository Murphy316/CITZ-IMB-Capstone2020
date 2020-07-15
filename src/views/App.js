/*
 * @Author: your name
 * @Date: 2020-06-23 14:59:48
 * @LastEditTime: 2020-07-07 17:15:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \CITZ-IMB-Capstone2020 - xordpe-dev\src\views\App.js
 */ 
import React, {useState} from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
//import Navbar from './Navbar.js';
import FetchLatestNews from './FetchLatestNews.js';
import FavoriteNews from './FavoriteNews.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// add .Dark mode
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./GlobalStyles.js";
import { lightTheme, darkTheme } from "./Themes.js";
import { UseDarkMode } from "./UseDarkMode.js";
import Toggler from "./Toggler.js";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CookieConsent from "react-cookie-consent";

function App() {
  const [theme, themeToggler, mountedComponent] = UseDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [deleted, setDeleted] = useState(false);

  const updateFavorites = () => {
    setDeleted(!deleted);
  }

  //The highlighted code is the only one added to UseDarkMode.js
  if(!mountedComponent) return <div/>
  
  return (
    <div>
<ThemeProvider theme={themeMode}>
<>
<GlobalStyles/>
    <Router>

        <Header updateFavorites={updateFavorites}/>
        {/* <Navbar /> */}
        <Toggler theme={theme} toggleTheme={themeToggler} />

        <Switch>

          <Route path="/favorites">
            <FavoriteNews deleted={deleted}/>
          </Route>

          <Route path="/">
            <FetchLatestNews />
          </Route>

        </Switch>

        <br/><br/>
        <Footer />
      
    </Router>
    </>
    </ThemeProvider>

    <CookieConsent
          onAccept={() => {
            alert("accepted!");
          }}
          debug={true}
          enableDeclineButton
          declineButtonText="Decline (optional)"
          onDecline={() => {
            alert("Please enable cookies for better user experience");
          }}
        >
          This website uses cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}>
            This bit of text is smaller :O
          </span>
        </CookieConsent>

    </div>
  );
}

export default App;

