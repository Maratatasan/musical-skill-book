import { useState, useEffect, useRef } from "react";
import { filterStyle } from "./filterStyle";

export interface FilterProps {
  values: string[];
  name: string;
  getFilterState(filterState: any): void;
}

export interface FilterState {
  [key: string]: string[];
}



const labelStyle = {
  paddingBottom: "0px",
};

export function Filter({
  values,
  name,
  getFilterState,
}: FilterProps): JSX.Element {
  // creating initial filter state from values
  let allValues: any = {};
  values.forEach((filter) => {
    allValues[filter] = true;
  });

  const [filterState, setFilterState] = useState(allValues);
const activeButton = "lightgreen"
const inactiveButton = "transparent"
  let filterReady = useRef(false);
  // below state is used for "Narrow the search"
  // When you type something in the search bar
  // it will update the available values in filter UI
  const [filtersInTheUI, setFiltersInTheUI] =
    useState(values);

  useEffect(() => {
    if (filterState) {
      if (!filterReady.current) {
        console.log(name + " filter is ready");
        filterReady.current = true;
        return;
      }

      let currentFilterState = [];

      for (const [option, checked] of Object.entries(
        filterState
      )) {
        if (checked) {
          currentFilterState.push(option);
        }
      }

      getFilterState({ [name]: currentFilterState });
    }
  }, [name, filterState, getFilterState]);

  return (
    <div>
      <h4 className="key-header"> {name}</h4>
      <div
        className="grey-one radius-5 spacing-05"
        style={filterStyle.padAndMargin5}
      >
        <input
          style={filterStyle.filterSearch}
          type="text"
          name="search"
          id="filter-search"
          placeholder="Narrow the search"
          onChange={updateFilterUi}
        />
        <hr></hr>
        <div
          className="filterOptions"
          style={{ height: "140px", overflow: "auto" }}
        >
          <ul
            style={filterStyle.filterOptions}
            className="list"
          >
            <li
              style={filterStyle.liStyle}
              key={"select-all-li"}
            >
              <button
                name="select-all"
                style={{...filterStyle.checkboxStyle, background: isEverySelected()? activeButton : inactiveButton}}
                key={"select-all"}
                onClick={handleSelectAll}
              >
                {" "}
                Filter Off
              </button>
            </li>
            {filtersInTheUI.map((filter, index) => (
              <li
                style={filterStyle.liStyle}
                key={filter + "li"}
              >
                <button
                  name={filter}
                  style={{
                    ...filterStyle.checkboxStyle,
                    background: isEverySelected()
                      ? inactiveButton
                      : filterState[filter]
                      ? activeButton
                      : inactiveButton,
                  }}
                  key={filter}
                  onClick={handleFilter}
                >
                  {" "}
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  function updateFilterUi(
    e: React.FormEvent<HTMLInputElement>
  ) {
    const { value } = e.currentTarget;
    let newUiState = values.filter((f) =>
      f.includes(value)
    );
    setFiltersInTheUI(newUiState);
  }

  function updateFilterState(
    e: React.FormEvent<HTMLInputElement>
  ) {
    const { checked } = e.currentTarget;
    const { name } = e.currentTarget;

    setFilterState({ ...filterState, [name]: checked });
  }

  function isEverySelected() {
    return Object.values(filterState).every((v) => v);
  }

  function handleFilter(e: any) {
    const { name } = e.currentTarget;
    console.log(e.target.name);

    // if All selected then select one

    const newState: any = {};
    if (isEverySelected()) {
      values.forEach((filter) => {
        newState[filter] = false;
      });
      newState[name] = true;
      setFilterState(newState);
    } else {
      setFilterState({
        ...filterState,
        [name]: !filterState[name],
      });
    }

    console.log(newState);
  }

  function handleSelectAll(e: any) {
    const newState: any = {};
    values.forEach((filter) => {
      newState[filter] = true;
    });
    setFilterState(newState);
  }
}
