import { useState, useEffect, useRef } from "react";

interface filterProps {
  values: string[];
  name: string;
  getFilterState(filterState: any): void;
}

const liStyle = {
  display: "flex",
  alignItems: "center",
  padding: "0px",
  margin: "0px",
};

const checkboxStyle = {
  marginRight: "4px",
  marginBottom: "0px",
  padding: "0px",
};

const labelStyle = {
  paddingBottom: "0px",
};

export function Filter({ values, name, getFilterState }: filterProps) {
  // creating initial filter state from values
  let allValues: any = {};
  values.forEach(filter => {
    allValues[filter] = true;
  });
  const [filterState, setFilterState] = useState(allValues);
  const [filterModel, setFilterModel] = useState(values);
  let filterReady = useRef(false);
  // below state is used for "Narrow the search"
  // When you type something in the search bar
  // it will update the available values in filter UI
  const [filtersInTheUI, setFiltersInTheUI] = useState(values);

  useEffect(() => {
    if (filterState) {
      if (!filterReady.current) {
        console.log(name + " filter is ready");
        filterReady.current = true;
        return;
      }

      let currentFilterState = [];

      for (const [option, checked] of Object.entries(filterState)) {
        if (checked) {
          currentFilterState.push(option);
        }
      }

      getFilterState({ [name]: currentFilterState });
    }
  }, [name, filterState, filterModel, getFilterState]);

  return (
    <div>
      <h4 className="key-header"> {name}</h4>
      <div className="grey-one radius-5 spacing-05" style={{ margin: "5px", padding: "5px" }}>
        <input
          style={{
            border: "none",
            padding: "0px",
            backgroundColor: "transparent",
            width: "80%",
          }}
          type="text"
          name="search"
          id="filter-search"
          placeholder="Narrow the search"
          onChange={updateFilterUi}
        />
        <hr></hr>
        <div className="filterOptions" style={{ height: "140px", overflow: "auto" }}>
          <ul
            style={{
              listStyle: "none",
              alignItems: "start",
              display: "flex",
              flexDirection: "column",
              padding: "5px",
              margin: "0px",
            }}
          >
            <li style={liStyle} key={"select-all-li"}>
              <input
                name="select-all"
                style={checkboxStyle}
                type="checkbox"
                key={"select-all"}
                checked={Object.values(filterState).every(v => v)}
                onChange={handleSelectAll}
              />
              <label htmlFor="select-all" style={labelStyle} key="select-all-label">
                select/deselect all
              </label>
            </li>
            {filtersInTheUI.map((filter, index) => (
              <li style={liStyle} key={filter + "li"}>
                <input name={filter} style={checkboxStyle} type="checkbox" key={filter} checked={filterState[filter]} onChange={updateFilterState} />
                <label htmlFor={filter} style={labelStyle} key={filter + "label"}>
                  {filter}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  function updateFilterUi(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    let newUiState = values.filter(f => f.includes(value));
    setFiltersInTheUI(newUiState);
  }

  function updateFilterState(e: React.FormEvent<HTMLInputElement>) {
    const { checked } = e.currentTarget;
    const { name } = e.currentTarget;

    setFilterState({ ...filterState, [name]: checked });
  }

  function handleSelectAll(e: React.FormEvent<HTMLInputElement>) {
    const { checked } = e.currentTarget;
    const newState: any = {};
    values.forEach(filter => {
      newState[filter] = checked;
    });
    setFilterState(newState);
  }
}
