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
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import AdminDashboard from "./components/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";

const theme = createTheme({
  palette: {
    primary: {
      main: '#7027A0'
    },
    secondary:{
      main: '#1DB9C3'
    }
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
})

function App() {
  return (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutAppNavBar />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/admin/users" element={<AdminUsers/>} />
          <Route path="/admin/products" element={<AdminProducts/>} />
        </Route>
        <Route element={<WithAppNavBar />}>
          <Route path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/logout" element={<Logout />} />
          <Route path=":productId" element={<ProductView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
