import {
  useRef,
  useState,
  MutableRefObject,
  ChangeEvent,
} from "react";
import { AdData } from "../ads/Ad";
import { Filter, FilterState } from "./Filter";

interface IFilterBarProps {
  ads: AdData[];
  handleFilter: (filterModel: FilterModel) => void;
  removeFromFilterList: string[];
}

export interface FilterModel {
  [key: string]: string[];
}

export function FilterBar({
  ads,
  handleFilter,
  removeFromFilterList,
}: IFilterBarProps): JSX.Element {

  const filterDebounce = useRef<ReturnType<typeof setInterval>>();
  //  <---- filter UI ---->
  const filterKeys: string[] = extractFilterKeys(
    ads,
    removeFromFilterList
  );
  const filterSet: FilterModel =
    extractUniqueDataForFilters(ads, filterKeys);
  const filterModel: MutableRefObject<FilterModel> = useRef(
    {}
  );

  function updateFilterModel(filterState: FilterState) {
    const [name, state] = Object.entries(filterState)[0];

    filterModel.current[name] = state;

    if (filterDebounce.current) {
      clearTimeout(filterDebounce.current);
    }

    filterDebounce.current = setTimeout(() => {
      handleFilter(filterModel.current);
    }
      , 250);
      
  }

  return (
    <div>
      <h2 style={{ marginBottom: 0 }}>filter by</h2>
      <div
        className="filter-key-div"
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {filterKeys.map((filterKey: string) => (
          <Filter
            values={filterSet[filterKey]}
            name={filterKey}
            getFilterState={updateFilterModel}
            key={filterKey}
          />
        ))}
      </div>
    </div>
  );
}

function extractUniqueDataForFilters(
  ads: AdData[],
  filterKeys: string[]
): FilterModel {
  const setsForFilters: any = {};
  let ad: any;
  let key: string;

  for (ad of ads) {
    for (key of filterKeys) {
      if (ad[key]) {
        if (!setsForFilters.hasOwnProperty(key)) {
          setsForFilters[key] = new Set();
        }
        setsForFilters[key].add(ad[key]);
      }
    }
  }

  const uniqueDataForFilters: FilterModel = {};

  for (key of filterKeys) {
    uniqueDataForFilters[key] = [...setsForFilters[key]];
  }

  return uniqueDataForFilters;
}

function extractFilterKeys(
  ads: AdData[],
  removeFromFilterList: string[]
) {
  const filterKeys = Object.keys(ads[0]);
  for (let removeItem of removeFromFilterList) {
    if (filterKeys.indexOf(removeItem) > -1) {
      filterKeys.splice(filterKeys.indexOf(removeItem), 1);
    }
  }
  return filterKeys;
}
