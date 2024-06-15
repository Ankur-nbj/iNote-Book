import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/Notes/NoteState";
import Login from "./components/Login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import Signup from "./components/Signup";

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() =>
    createTheme(themeSettings(mode)), [mode]);
  // const isAuth=localStorage.getItem('token');

  return (
    <div className="app">
      <NoteState>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
