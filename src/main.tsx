import ReactDOM from "react-dom/client";
import App from "@src/components/App/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@src/styles/global.scss";

// TEMP IMPORT
import { LazyStore } from "@tauri-apps/plugin-store";

const Testing = () => {
  const myFunction = async () => {
    console.log("Printed");
    const store = new LazyStore("settings.json");

    const val = await store.get<{ value: number }>("some-key");
    console.log(val);
  };

  return (
    <div className="p-4">
      <h1>New Window Content</h1>
      <p>This is a new window created with Tauri!</p>
      <button onClick={myFunction}>Test</button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/testing" element={<Testing />} />
    </Routes>
  </BrowserRouter>
);
