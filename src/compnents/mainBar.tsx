import { OneBarTab } from "./oneBarTab";

import { useState } from "react";

export function MainBar() {
  let [selectedTab, setSelectedTab] = useState([
    "History",
    "About",
    "Contact",
    'Colaborate',
    'Genre'
  ]);




  return (
    <div style={{border: 'solid grey 1px', display: 'flex', justifyContent: 'center'}}>
      {selectedTab.map((tabText, index) => (
        <OneBarTab text={tabText} key={tabText+index} index={index} />
      ))}
    </div>
  );
}
