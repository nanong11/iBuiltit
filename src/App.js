import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppNavBar from "./components/AppNavBar";
import Signup from "./pages/Signup";




function App() {
  return (
   <>
    <BrowserRouter>
      <AppNavBar />
      <Routes>
        <Route path="/signup" element={ <Signup/> }/>
        
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
