import {
  useRef,
  useState,
  MutableRefObject,
  ChangeEvent,
} from "react";

import { Filter, FilterState } from "./Filter";

// interfaces for the filter
interface FilterBarProps {
  filterKeys: string[];
  filterSet: FilterModel;
  handleFilter: (filterModel: FilterModel) => void;
}

export interface FilterModel {
  [key: string]: string[];
}


// the filter bar component
export function FilterBar({
  filterKeys,
  filterSet,
  handleFilter,
}: FilterBarProps): JSX.Element {
  const filterDebounce =
    useRef<ReturnType<typeof setInterval>>();

  //  <---- filter UI ---->

  // console.log({ component: 'filterBar', filterKeys, filterSet });
  
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
    }, 250);
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
