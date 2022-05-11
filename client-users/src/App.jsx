import { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import AddVehicle from "./pages/AddVehicle";
import PrivateRoutes from "./utils/PrivateRoutes";
import ConfirmEmail from "./pages/ConfirmEmail";
import Wishlist from "./pages/Wishlist";
//styles
import "./scss/index.scss";
import "./scss/style.header-spaceship-variant-one.scss";
import "./scss/style.mobile-header-variant-one.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getWishlist } from "./actions/wishlistActions";
import Profile from "./pages/Profile";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
} else {
  setAuthToken(false);
}

function App({ currentLocale, getWishlist, error, user, loadUser, logout }) {
  const { locale, direction, code } = currentLocale;
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = code;
  }, [direction, code]);

  useEffect(() => {
    loadUser();
    getWishlist();
  }, []);

  useEffect(() => {
    if (user && !user.confirmed) {
      navigate("/confirm-email");
    }
  }, [user]);

  if (user === undefined) {
    return null;
  }

  return (
    <HelmetProvider>
      <LanguageProvider locale={locale}>
        <div className='site site--desktop-header--spaceship-one site--mobile-header--mobile-one'>
          <ToastContainer autoClose={5000} hideProgressBar />
          <div className='site__container'>
            <header className='site__mobile-header'>
              <MobileHeader />
            </header>

            <header className='site__header'>
              <Header />
            </header>
            <div className='site__body'>
              {error && error.type === "authorization" && (
                <div className='alert alert-sm alert-danger mt-5'>
                  {/* <FormattedMessage id={error.message} /> */}
                  <p>{error.message}</p>
                </div>
              )}
              <Routes>
                <Route
                  exact
                  path='/'
                  element={<Home style={{ height: "1500px" }} />}
                />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />

                <Route exact path='/add-product' element={<AddProduct />} />
                <Route element={<PrivateRoutes user={user} />}>
                  <Route path='/add-vehicle' element={<AddVehicle />} />
                  <Route path='/confirm-email' element={<ConfirmEmail />} />
                  <Route path='/favorite' element={<Wishlist />} />
                  <Route path='/profile' element={<Profile />} />
                </Route>
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
  user: state.authState.user,
  error: state.errorState.error,
});
const actions = { loadUser, logout, getWishlist };
export default connect(mapStateToProps, actions)(App);
