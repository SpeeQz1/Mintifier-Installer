import ReactDOM from "react-dom/client";
import App from "@src/components/App/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@src/styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);