import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./index.css";
import "./brand.css";

const root = document.getElementById("root")!;
const app = (
  <Router>
    <App />
  </Router>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
