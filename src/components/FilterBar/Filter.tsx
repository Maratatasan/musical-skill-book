import { useState, useEffect } from "react";

export function Filter() {
  let filterRender: string[] = [];

  // add hundred new filters here
  for (let i = 0; i < 100; i++) {
    filterRender.push(`filter ${i}`);
  }
  const [filterMame, setFilterMame] = useState("Number");
  const [filterValues, setFilterValues] =
    useState(filterRender);
  const [filterModel, setFilterModel] = useState([
    "filter 2",
  ]);

  let allValues: any = {};
  filterValues.forEach(filter => {
    allValues[filter] = true;
  });

  const [filterState, setFilterState] = useState(allValues);

  const [filtersInTheUI, setFiltersInTheUI] =
    useState(filterRender);

  useEffect(() => {
    console.log("filterModel", filterModel);
  }, [filterModel]);

  function updateFilterUi(
    e: React.FormEvent<HTMLInputElement>
  ) {
    const value = e.currentTarget.value;
    let newUiState = filterRender.filter(f =>
      f.includes(value)
    );
    setFiltersInTheUI(newUiState);
  }

  const handleFilter = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const { checked } = e.currentTarget;
    const { name } = e.currentTarget;

    setFilterState({ ...filterState, [name]: checked });
  };

  const handleSelectAll = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const { checked } = e.currentTarget;
    const newState: any = {};
    filterRender.forEach(filter => {
      newState[filter] = checked;
    });
    setFilterState(newState);
  };

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

  return (
    <div className="grey-one">
      <input
      style={{borderTop: "1px solid #e0e0e0", borderBottom: "1px solid #e0e0e0"}}
        type="text"
        name="search"
        id="filter-search"
        placeholder="Narrow the search"
        onChange={updateFilterUi}
      />
      <div
        className="filterOptions"
        style={{ height: "150px", overflow: "auto" }}
      >
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
            <label
              htmlFor="select-all"
              style={labelStyle}
              key="select-all-label"
            >
              select / deselect all
            </label>
          </li>
          {filtersInTheUI.map((filter, index) => (
            <li style={liStyle} key={filter + "li"}>
              <input
                name={filter}
                style={checkboxStyle}
                type="checkbox"
                key={filter}
                checked={filterState[filter]}
                onChange={handleFilter}
              />
              <label
                htmlFor={filter}
                style={labelStyle}
                key={filter + "label"}
              >
                {filter}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
