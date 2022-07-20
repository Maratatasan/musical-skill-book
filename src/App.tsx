import React, { useState } from "react";

import "./App.css";
import { AdList, adTypes, IAdTypes } from "./components/ads/AdList";
import { IAdData } from "./components/ads/Ad";
import { FilterBar } from "./components/FilterBar/FilterBar";

import { AdvertDetails } from "./components/advertDetails";
import { MainBanner } from "./components/mainBanner";
import { MainBar } from "./components/mainBar";
import { Filter } from "./components/FilterBar/Filter";



function App() {
  const [ads, setAds] = useState<IAdData[]>(getMockAdData(adTypes));
  // filter everything 
  const [adsInUI, setAdsInUI] = useState<IAdData[]>(getMockAdData(adTypes));

  //  <---- fileter logic ---->
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>, filterKey: keyof IAdData) => {

    let { value } = event.target

    let filteredAds = adsInUI.filter((ad: IAdData) => {
      return ad[filterKey] === value
    })

    if (value === "all") {

      setAdsInUI(getMockAdData(adTypes))
    } else {
      setAdsInUI(filteredAds)
    }
  }

  const removeFromFilterList = ["about", 'title'];



  // <---- filter UI ---->







  // const [filterModel, setFilterModel] = useState({})
  // const adsAfterFilter = filterAds(ads, filterModel)



  // function onFilterChange (model){
  // setFilterModel(model) 
  // }

  return (
    <div className="App" >
      
      <MainBanner />
      <MainBar />

      <FilterBar ads={adsInUI} handleFilter={handleFilter} removeFromFilterList={removeFromFilterList} />
      <AdList ads={adsInUI} />
    </div>
  );
}

export default App;


// function filterAds(ads, filterModel) {



//   return //....
// }

// function FilterBar(props) {
//   const { setFilterModel, filterModel } = props;



//   const onChange = ()=> {
//     setFilterModel({})
//   }

//   return <div>


//     {/* filter bar  uiUI */}


//   </div>

// }

function getMockAdData(adTypes: IAdTypes): IAdData[] {
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