import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import Home from "./pages/Home";
import WithAppNavBar from "./components/WithAppNavBar";
import WithoutAppNavBar from "./components/WithoutAppNavBar";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";

const theme = createTheme({
  palette: {
    primary: {
      main: '#7027A0'
    },
    secondary:{
      main: '#1DB9C3'
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  return (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutAppNavBar />}>
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<WithAppNavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
