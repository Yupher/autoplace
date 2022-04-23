import { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import LanguageProvider from "./i18n/LanguageProvider";

//components
import Header from "./components/header/Header";
import MobileHeader from "./components/mobile/MobileHeader";
import MobileMenu from "./components/mobile/MobileMenu";
import Footer from "./components/footer/Footer";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// styles
import "./scss/index.scss";
import "./scss/style.header-classic-variant-four.scss";
import "./scss/style.mobile-header-variant-two.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App({ currentLocale }) {
  const { locale, direction, code } = currentLocale;

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = code;
  }, [direction, code]);

  return (
    <HelmetProvider>
      <LanguageProvider locale={locale}>
        <div className='site site--desktop-header--classic-four site--mobile-header--mobile-two'>
          <ToastContainer autoClose={5000} hideProgressBar />
          <div className='site__container'>
            <header className='site__mobile-header'>
              <MobileHeader />
            </header>

            <header className='site__header'>
              <Header />
            </header>
            <div className='site__body'>
              {/* {error && error.type === "authorization" && (
                <div className='alert alert-sm alert-danger mt-5'>
                   <FormattedMessage id={error.message} /> 
                  <p>{error.message}</p>
                </div>
              )} */}
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                {/*
                <Route exact path='/add-product' element={<AddProduct />} />
                <Route element={<PrivateRoutes user={user} />}>
                  <Route path='/add-vehicle' element={<AddVehicle />} />
                </Route> */}
              </Routes>
            </div>
            <footer className='site__footer'>
              <Footer />
            </footer>
          </div>

          <MobileMenu />

          {/* <Quickview /> */}
        </div>
      </LanguageProvider>
    </HelmetProvider>
  );
}

const mapStateToProps = (state) => ({
  currentLocale: state.languages.currentLocale,
});

export default connect(mapStateToProps)(App);
