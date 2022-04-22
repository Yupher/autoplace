import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";

function App() {
  let productInputs;
  let userInputs;

  return (
    <Layout>
      <Router>
        <Routes>
          {/* root path */}
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />

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
                element={<New inputs={productInputs} title='Manage products' />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
