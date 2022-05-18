import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LanguageProvider from "./i18n/LanguageProvider";
import { loadUser, logout } from "./actions/authActions";
import { getWishlist } from "./actions/wishlistActions";
import setAuthToken from "./utils/setAuthToken";
import { CLEAR_ERROR, SET_ERROR } from "./actions/types/errorTypes";

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
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
//styles
import "./scss/index.scss";
import "./scss/style.header-spaceship-variant-one.scss";
import "./scss/style.mobile-header-variant-one.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
} else {
  setAuthToken(false);
}

function App({ currentLocale, getWishlist, error, user, loadUser, logout }) {
  const { locale, direction, code } = currentLocale;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = code;
  }, [direction, code]);

  useEffect(() => {
    loadUser();
    getWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && !user.confirmed) {
      dispatch({
        type: SET_ERROR,
        payload: {
          type: "confirm user",
          message: "Please confirm your email",
        },
      });
    } else {
      dispatch({ type: CLEAR_ERROR });
    }
  }, [user]);

  useEffect(() => {
    if (error && error.type !== "confirm user") {
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 8000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
              {error && error.type === "confirm user" && (
                <div className='alert alert-sm alert-danger mt-5'>
                  {/* <FormattedMessage id={error.message} /> */}
                  <p>
                    {error.message}, to confirm your email{" "}
                    <Link to='/confirm-email'>click here</Link>
                  </p>
                </div>
              )}
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route
                  exact
                  path='/reset-password'
                  element={<ResetPassword />}
                />

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
