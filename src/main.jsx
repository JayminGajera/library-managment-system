import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import appStore from "./store/store.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Provider store={appStore}>
      <BrowserRouter>
        <Navbar />
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>


  </React.StrictMode>
);
