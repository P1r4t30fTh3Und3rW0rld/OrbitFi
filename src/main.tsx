import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { initializeApp } from "./bootstrap/initializeApp";

// kick off initialization (migrations, etc.)
initializeApp().catch((e) => console.error(e));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
