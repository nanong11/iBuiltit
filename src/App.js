import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import WithAppNavBar from "./components/WithAppNavBar";
import WithoutAppNavBar from "./components/WithoutAppNavBar";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route element={<WithoutAppNavBar />}>
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<WithAppNavBar />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
