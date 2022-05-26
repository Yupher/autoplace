import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import LanguageProvider from "./i18n/LanguageProvider";
import { loadUser, logout } from "./actions/authActions";
import { CLEAR_ERROR } from "./actions/types/errorTypes";

import PrivateRoutes from "./utils/PrivateRoutes";

//components
import Header from "./components/header/Header";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import VehiclePage from "./pages/VehiclePage";
import Users from "./pages/Users";

// styles
import "./scss/index.scss";
import "./scss/style.header-classic-variant-four.scss";
import "./scss/style.mobile-header-variant-two.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserPage from "./pages/UserPage";

//authtoken
import setAuthToken from "./utils/setAuthToken";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
} else {
  logout();
  setAuthToken(false);
}

function App({ currentLocale, error, user, loadUser, logout }) {
  const { locale, direction, code } = currentLocale;
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = code;
  }, [direction, code]);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({ type: CLEAR_ERROR });
      }, 5000);
    }
  }, [error]);

  if (user === undefined) {
    return null;
  }

  return (
    <HelmetProvider>
      <LanguageProvider locale={locale}>
        <div className='site site--desktop-header--classic-four site--mobile-header--mobile-two'>
          <ToastContainer autoClose={5000} hideProgressBar />
          <div className='site__container'>
            <header className='site__header'>
              <Header />
            </header>
            <div className='site__body'>
              {error && error.type === "authorization" && (
                <div className='alert alert-sm alert-danger mt-5'>
                  {/* <FormattedMessage id={error.message} />  */}
                  <p>{error.message}</p>
                </div>
              )}
              <Routes>
                <Route path='/login' element={<Login />} />

                <Route element={<PrivateRoutes user={user} />}>
                  <Route path='/' element={<Home />} />
                  {/* users routes */}
                  <Route path='/users'>
                    <Route index element={<Users />} />
                    <Route path='/users/:userId' element={<UserPage />} />
                  </Route>
                  {/* product routes */}
                  <Route path='/products'>
                    <Route index element={<Products />} />
                    <Route
                      path='/products/:productId'
                      element={<VehiclePage />}
                    />
                  </Route>
                </Route>
              </Routes>
            </div>
          </div>
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
const actions = { loadUser, logout };
export default connect(mapStateToProps, actions)(App);
