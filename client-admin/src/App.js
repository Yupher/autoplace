import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { Fragment } from "react";
import Navbar from "./components/navbar/Navbar";

function App() {
  let productInputs;
  let userInputs;

  const location = useLocation();

  return (
    <Fragment>
      <Navbar />
      {location.pathname === "/login" ? (
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            {/* root path */}
            <Route path='/'>
              <Route index element={<Home />} />

              {/* users path */}
              <Route path='users'>
                <Route index element={<List />} />
                <Route path=':userId' element={<Single />} />
                <Route
                  path='new'
                  element={<New inputs={userInputs} title='Manage users' />}
                />
              </Route>

              {/* produts path */}
              <Route path='products'>
                <Route index element={<List />} />
                <Route path=':productId' element={<Single />} />
                <Route
                  path='new'
                  element={
                    <New inputs={productInputs} title='Manage products' />
                  }
                />
              </Route>
            </Route>
          </Routes>
        </Layout>
      )}
    </Fragment>
  );
}

export default App;
