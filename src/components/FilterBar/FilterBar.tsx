import { IAdData } from "../ads/Ad";


interface IFilterBarProps {
    ads: IAdData[];
    handleFilter: (event: React.ChangeEvent<HTMLSelectElement>, filterKey: keyof IAdData) => void;
    removeFromFilterList: string[];
}

export function FilterBar({ ads, handleFilter, removeFromFilterList }: IFilterBarProps): JSX.Element {
    //  <---- filter UI ---->
    const filterKeys = Object.keys(ads[0]);
    let ad: any;
    let key: string;
    const filterSet: any = {};

    // things to remove from the list

    let removeItem: string;
    for (removeItem of removeFromFilterList) {
        if (filterKeys.indexOf(removeItem) > -1) {
            filterKeys.splice(filterKeys.indexOf(removeItem), 1)
        }
    }

    // creating a filter set
    // with unique values for each filter key
    for (ad of ads) {
        for (key of filterKeys) {
            if (ad[key]) {
                if (!filterSet.hasOwnProperty(key)) {
                    filterSet[key] = new Set();
                }
                filterSet[key].add(ad[key]);
            }
        }
    }

    // coersing set into array for use in filter UI
    for (key of filterKeys) {
        filterSet[key] = [...filterSet[key]];
    }


    return (<div>
        <h2>filter by</h2>
        <div
            className="filter-key-div"
            style={{
                display: "flex",
                justifyContent: "space-around",
            }}
        >
            {filterKeys.map((filterKey: any) => (
                <div key={filterKey as string}>
                    <h4 className="key-header" > {filterKey}</h4>
                    <select onChange={(e) => handleFilter(e, filterKey)}>
                        <option value="all">all</option>
                        {
                            filterSet[filterKey].map((item: string) => {
                                return <option key={item}>{item}</option>;
                            })
                        }
                    </select>
                </div>
            ))}
        </div>
    </div>)
}