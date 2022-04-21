import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";

function App() {
  return (
    <div className='App'>
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
              <Route path='new' element={<New />} />
            </Route>

            {/* produts path */}
            <Route path='products'>
              <Route index element={<List />} />
              <Route path=':productId' element={<Single />} />
              <Route path='new' element={<New />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
