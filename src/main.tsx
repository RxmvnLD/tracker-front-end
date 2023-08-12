import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#c6a9ff",
            contrastText: "#11111c",
        },
        secondary: {
            main: "#98EECC",
            contrastText: "#11111c",
        },
        success: {
            main: "#D0F5BE",
        },
        background: {
            default: "#1b1b2d",
        },
    },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
);
