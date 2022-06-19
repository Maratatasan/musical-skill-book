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


  return (
    <div>
      <h1>Add List</h1>
      <div className="ad-list" style={{display: 'flex', width:'1200px'}}>
        {getMockAdData(adTypes).map((ad, i) =>
          OneAd(i, ad)
        )}
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
