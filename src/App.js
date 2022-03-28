import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppNavBar from "./components/AppNavBar";




function App() {
  return (
   <>
    <BrowserRouter>
      <AppNavBar />
      <Routes>
        
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
