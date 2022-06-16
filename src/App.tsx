import React from "react";

import "./App.css";
import { AdvertDetails } from "./components/advertDetails";
import { MainBanner } from "./components/mainBanner";
import { MainBar } from "./components/mainBar";

function App() {
  return (
    <div className="App">
      <MainBanner />
      <MainBar />
      <AdvertDetails />
    </div>
  );
}

export default App;
