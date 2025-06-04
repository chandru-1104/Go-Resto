import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./components/App";

import { makeServer } from "./server";
import { HomeProvider } from "./context/HomeContext";
import { FoodListProvider } from "./context/FoodListContext";
import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import { OrderProvider } from "./context/OrderContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <HomeProvider>
          <FoodListProvider>
            <OrderProvider>
              <ErrorProvider>
                <App />
              </ErrorProvider>
            </OrderProvider>
          </FoodListProvider>
        </HomeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
