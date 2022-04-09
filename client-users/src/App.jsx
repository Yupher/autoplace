import { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import LanguageProvider from "./i18n/LanguageProvider";

import Header from "./components/header/Header";
//styles
import "./scss/index.scss";
import "./scss/style.header-spaceship-variant-one.scss";
import "./scss/style.mobile-header-variant-one.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App({ children }) {
  useEffect(() => {
    document.documentElement.dir = "ltr";
  }, []);
  return (
    <LanguageProvider locale='en'>
      <div className='site site--desktop-header--spaceship-one site--mobile-header--mobile-one'>
        <ToastContainer autoClose={5000} hideProgressBar />
        <div className='site__container'>
          {/*
            <header className='site__mobile-header'>
              <MobileHeader />
            </header>
            */}

          <header className='site__header'>
            <Header />
          </header>

          <div className='site__body' style={{ height: "1500px" }}>
            {children}
          </div>

          <footer className='site__footer'>
            footer
            {/* <Footer /> */}
          </footer>
        </div>

        {/* <MobileMenu /> */}

        {/* <Quickview /> */}
      </div>
    </LanguageProvider>
  );
}

export default App;
