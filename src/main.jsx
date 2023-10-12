import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { store } from './store.js';
import {Provider} from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import * as serviceWorker from "./swDev";
// import swDev from './swDev';

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
        <GoogleOAuthProvider clientId="182942846521-fud01cnh7a72jq1ojrm1ttbdreg6jtso.apps.googleusercontent.com">
      <Provider store={store}>
          <App />
      </Provider>
        </GoogleOAuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// swDev();
