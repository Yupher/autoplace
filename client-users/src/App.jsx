import { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LanguageProvider from "./i18n/LanguageProvider";

//components
import Header from "./components/header/Header";

//pages
import Home from "./pages/Home";
import Register from "./pages/Register";

//styles
import "./scss/index.scss";
import "./scss/style.header-spaceship-variant-one.scss";
import "./scss/style.mobile-header-variant-one.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App({ currentLocale }) {
  const { locale, direction, code } = currentLocale;
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = code;
  }, []);
  return (
    <HelmetProvider>
      <LanguageProvider locale={locale}>
        <Router>
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
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/register' element={<Register />} />
                </Routes>
              </div>

              <footer className='site__footer'>
                footer
                {/* <Footer /> */}
              </footer>
            </div>

            {/* <MobileMenu /> */}

            {/* <Quickview /> */}
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

const mapStateToProps = (state) => ({
  currentLocale: state.languages.currentLocale,
});
export default connect(mapStateToProps)(App);
