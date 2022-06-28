import React from "react";

import "./App.css";
import { AdList } from "./components/ads/AdList";
import { AdvertDetails } from "./components/advertDetails";
import { MainBanner } from "./components/mainBanner";
import { MainBar } from "./components/mainBar";

function App() {
  return (
    <div className="App" >
      <MainBanner />
      <MainBar />
      <AdList />
      {/* <AdvertDetails /> */}
    </div>
  );
}

export default App;
