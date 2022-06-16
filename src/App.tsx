import React from 'react';

import './App.css';
import { AdvertDetails } from './compnents/advertDetails';
import { MainBaner } from './compnents/mainBaner';
import { MainBar } from './compnents/mainBar';

function App() {
  return (
    <div className="App">
<MainBaner/>
<MainBar/>
<AdvertDetails/>
    </div>
  );
}

export default App;
