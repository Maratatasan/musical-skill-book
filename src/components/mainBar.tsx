import { OneBarTab } from "./oneBarTab";

import { useState } from "react";

export function MainBar() {
  let [selectedTab, setSelectedTab] = useState([
    "History",
    "About",
    "Contact",
    'Collaborate',
    'Genre'
  ]);




  return (
    <div className="spacing-1" style={{border: 'solid grey 1px', display: 'flex', justifyContent: 'center'}}>
      {selectedTab.map((tabText, index) => (
        <OneBarTab text={tabText} key={tabText+index} index={index} />
      ))}
    </div>
  );
}
