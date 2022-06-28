import { equal } from "assert";
import { OneAd, iAdData } from "./OneAd";

interface iAdTypes {
  OFFERING: string;
  REQUEST: string;
}

const adTypes: iAdTypes = {
  OFFERING: "OFFERING",
  REQUEST: "REQUEST",
};

export function AdList(): JSX.Element {
  const addData = getMockAdData(adTypes);
  const filterKeys = Object.keys(addData[0]);
  let ad: any;
  let key: string;
  const filterSet: any = {};

  for (ad of addData) {
    for (key of filterKeys) {
      if (ad[key]) {
        if (!filterSet.hasOwnProperty(key)) {
          filterSet[key] = new Set();
        }
        filterSet[key].add(ad[key]);
      }
    }
  }

  filterSet["title"].forEach((element: any) => {
    console.log(element);
  });

  const filters: any = {};

  filterKeys.forEach((key) => {
    filters[key] = [];
  });
  // console.log('the log',filterSet['title'].entries());
  return (
    <div>
      <h1>Add List</h1>
      <div>
        <h2>filter by</h2>
        <div
          className="filter-key-div"
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {filterKeys.map((key) => (
            <div>
              <h4 className="key-header"> {key}</h4>
              <select>
                {filterSet[key].forEach((value: any) => {
                  return filters[key].push(<option key={value}>{value}</option>)
                })}
              </select>
            </div>
          ))}
        </div>
      </div>
      <div
        className="ad-list"
        style={{ display: "flex", width: "1200px" }}
      >
        {addData.map((ad, i) => OneAd(i, ad))}
      </div>
    </div>
  );
}

function getMockAdData(adTypes: iAdTypes): iAdData[] {
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
  ];
}
