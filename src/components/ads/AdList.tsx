
import { Ad, IAdData } from "./Ad";

export interface IAdTypes {
  OFFERING: string;
  REQUEST: string;
}

export const adTypes: IAdTypes = {
  OFFERING: "OFFERING",
  REQUEST: "REQUEST",
};

interface IAdListProps {
  ads: IAdData[];
}

export function AdList({ ads }: IAdListProps): JSX.Element {

  return (
    <div>
      <h1>Add List</h1>

      <div
        className="ad-list"
        style={{ display: "flex", flexDirection: 'column', width: "1200px", alignItems: "center" }}
      >
        {ads.map((ad, i) => {
          return <Ad
            key={i}
            title={ad.title}
            skill={ad.skill}
            city={ad.city}
            about={ad.about}
            musicGenre={ad.musicGenre}
            addType={ad.addType}
          />;
        })}
      </div>
    </div>
  );
}

// function getMockAdData(adTypes: IAdTypes): IAdData[] {
//   const { OFFERING, REQUEST } = adTypes;

//   return [
//     {
//       title: "Professional Mixing Service",
//       skill: "Mixing engineer",
//       city: "London",
//       about:
//         "I am a Professional mixing engineer with over 10 years of experience in the mixing industry. Looking to make a difference in the world of mixing.",
//       musicGenre: "Rock",
//       addType: OFFERING,
//     },
//     {
//       title: "Looking For Pop Singer in New York",
//       skill: "Singer",
//       city: "New York",
//       about:
//         "We are looking for a Pop Singer to join our team",
//       musicGenre: "Pop",
//       addType: REQUEST,
//     },
//     {
//       title: "Looking For Metal Drummer in Paris",
//       skill: "Drummer",
//       city: "Paris",
//       about:
//         "We are looking for a Metal Drummer to join our team",
//       musicGenre: "Metal",
//       addType: REQUEST,
//     },
//     {
//       title: "Guitarist in London",
//       skill: "Guitarist",
//       city: "London",
//       about:
//         "I am a passionate rock guitarist looking to join a great band.",
//       musicGenre: "Rock",
//       addType: OFFERING,
//     },
//     {
//       title: "Guitarist in London",
//       skill: "Guitarist",
//       city: "London",
//       about:
//         "I am a passionate rock guitarist looking to join a great band.",
//       musicGenre: "Metal",
//       addType: OFFERING,
//     },
//   ];
// }
