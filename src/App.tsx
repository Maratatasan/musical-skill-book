import React, { useState } from "react";

import "./App.css";
import {
  AdList,
  adTypes,
  IAdTypes,
} from "./components/ads/AdList";
import { AdData } from "./components/ads/Ad";
import {
  FilterBar,
  FilterModel,
} from "./components/filter/FilterBar";

import { AdvertDetails } from "./components/advertDetails";
import { MainBanner } from "./components/mainBanner";
import { MainBar } from "./components/mainBar";
import { Filter } from "./components/filter/Filter";

// methods
import {
  extractFilterKeys,
  extractUniqueDataForFilters,
} from "./components/filter/filterMethods";

function App() {
  const [ads, setAds] = useState<AdData[]>(
    getMockAdData(adTypes)
  );
  // filter everything
  const [adsInUI, setAdsInUI] = useState<AdData[]>(
    getMockAdData(adTypes)
  );

  const [adsAfterFilter, setAdsAfterFilter] = useState<
    AdData[]
  >(getMockAdData(adTypes));

  //  <---- fileter logic ---->

  const handleFilter = (filterModel: FilterModel): void => {
    let filteredAds = ads.filter((ad: AdData, i) => {
      type AdKey = keyof typeof ad;

      for (const props of Object.entries(filterModel)) {
        let adPropName = props[0] as AdKey;
        let activeValues: string[] = props[1];
        if (!activeValues.includes(ad[adPropName])) {
          return false;
        }
      }

      return true;
    });

    setAdsAfterFilter(filteredAds);
  };

  
  // <---- filter UI ---->
  const removeFromFilterList = ["about", "title"];

  let filterKeys = extractFilterKeys(
    ads,
    removeFromFilterList
  );
  let filterSet = extractUniqueDataForFilters(
    ads,
    filterKeys
  );

  return (
    <div className="App">
      <MainBanner />
      <MainBar />

      <FilterBar
        handleFilter={handleFilter}
        filterKeys={filterKeys}
        filterSet={filterSet}
      />
      <AdList ads={adsAfterFilter} />
    </div>
  );
}

export default App;


function getMockAdData(adTypes: IAdTypes): AdData[] {
  const { OFFERING, REQUEST } = adTypes;

  return [
    {
      title: "Professional Mixing Service",
      skill: "Mixing engineer",
      city: "London",
      about:
        "I am a Professional mixing engineer with over 10 years of experience in the mixing industry. Looking to make a difference in the world of mixing.",
      musicGenre: "Rock",
      addType: OFFERING,
    },
    {
      title: "Looking For Pop Singer in New York",
      skill: "Singer",
      city: "New York",
      about:
        "We are looking for a Pop Singer to join our team",
      musicGenre: "Pop",
      addType: REQUEST,
    },
    {
      title: "Looking For Metal Drummer in Paris",
      skill: "Drummer",
      city: "Paris",
      about:
        "We are looking for a Metal Drummer to join our team",
      musicGenre: "Metal",
      addType: REQUEST,
    },
    {
      title: "Guitarist in London",
      skill: "Guitarist",
      city: "London",
      about:
        "I am a passionate rock guitarist looking to join a great band.",
      musicGenre: "Rock",
      addType: OFFERING,
    },
    {
      title: "Guitarist in London",
      skill: "Guitarist",
      city: "London",
      about:
        "I am a passionate rock guitarist looking to join a great band.",
      musicGenre: "Metal",
      addType: OFFERING,
    },
  ];
}
