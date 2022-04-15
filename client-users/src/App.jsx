import { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LanguageProvider from "./i18n/LanguageProvider";
import { loadUser, logout } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

//components
import Header from "./components/header/Header";
import MobileHeader from "./components/mobile/MobileHeader";
import MobileMenu from "./components/mobile/MobileMenu";
import Footer from "./components/footer/Footer";

//pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";

//styles
import "./scss/index.scss";
import "./scss/style.header-spaceship-variant-one.scss";
import "./scss/style.mobile-header-variant-one.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App({ currentLocale, user, loadUser, logout }) {
  const { locale, direction, code } = currentLocale;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
  } else {
    logout();
  }

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = code;
  }, []);

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user, loadUser]);

  return (
    <HelmetProvider>
      <LanguageProvider locale={locale}>
        <Router>
          <div className='site site--desktop-header--spaceship-one site--mobile-header--mobile-one'>
            <ToastContainer autoClose={5000} hideProgressBar />
            <div className='site__container'>
              <header className='site__mobile-header'>
                <MobileHeader />
              </header>

              <header className='site__header'>
                <Header />
              </header>
              <div className='site__body' style={{ height: "1500px" }}>
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route exact path='/add-product' element={<AddProduct />} />
                </Routes>
              </div>
              <footer className='site__footer'>
                <Footer />
              </footer>
            </div>

            <MobileMenu />

            {/* <Quickview /> */}
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

const mapStateToProps = (state) => ({
  currentLocale: state.languages.currentLocale,
  user: state.authState.user,
});
const actions = { loadUser, logout };
export default connect(mapStateToProps, actions)(App);
