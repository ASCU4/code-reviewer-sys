import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="181407760676-pac8gv2po4lm1s1cah8j2k703cbm1u40.apps.googleusercontent.com">
      <BrowserRouter>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px solid rgba(20,184,166,.25)",
            },
          }}
        />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);