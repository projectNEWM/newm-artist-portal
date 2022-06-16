import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Background, PrivateRoute } from "components";
import Login from "pages/login";
import Home from "pages/home";
import SignUp from "pages/signUp";
import CreateProfile from "pages/createProfile";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import theme from "theme";
import store from "./store";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <CssBaseline />

        <Background>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={ <Navigate to="home" replace /> } />

              <Route path="linkedin" element={ <LinkedInCallback /> } />

              <Route path="login" element={ <Login /> } />

              <Route path="sign-up/*" element={ <SignUp /> } />

              <Route
                path="home/*"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />

              <Route
                path="create-profile/*"
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </Background>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
