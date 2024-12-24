import React, { useEffect } from 'react'

function FilterBox({
    setfilterText,
    handleSelectAllcheckBox,
    isAllSelected,
    entireData,
    filterText,
    selectedRowIdArray,
    onCheckboxSelect,
    handleFilterApply,
    setfilterField,
    heading,
    setselectedRowIdArray,setRemoveFilter
  }){

    useEffect(() => {
        if (isAllSelected) {
          const newSelectedIds = entireData
            .filter(
              (row) =>
                `${typeof row[heading] === "boolean" ? row[heading].toString() : row[heading]}`
                  .toLowerCase()
                  .includes(filterText.toLowerCase())
            )
            .map((row) => row["ID"]);
      
          setselectedRowIdArray(newSelectedIds);
        }
      }, [isAllSelected, entireData, filterText, heading, setselectedRowIdArray]);
      
  return (
    <div className="absolute top-8 right-0 bg-white z-50  border border-gray-300 shadow-lg rounded-md p-4 w-[full] max-w-[280px] ">
    <div className="flex items-center justify-between mb-2">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none text-gray-900 focus:ring-2 focus:ring-[#F5821F]"
        onChange={(e) => setfilterText(e.target.value)}
      />
    </div>
    <div className="flex items-center mb-3">
      <input
        type="checkbox"
        id="selectAll"
        className="h-4 w-4"
        onChange={(e) => handleSelectAllcheckBox(e.target.checked, "DeSelect")}
        checked={isAllSelected}
      />
      <label htmlFor="selectAll" className="ml-2 text-sm text-gray-800 font-semibold">
        Select All
      </label>
    </div>
    <div className="flex flex-col max-h-48 overflow-y-auto px-2">
      {(() => {
        let hasResults = false;
        const results = entireData.map((row) => {
          if (
            `${typeof row[heading] === "boolean" ? row[heading].toString() : row[heading]}`
              .toLowerCase()
              .includes(filterText.toLowerCase())
          ) {
            hasResults = true;
            // if (isAllSelected && !selectedRowIdArray.includes(row["ID"])) {
            // //   selectedRowIdArray.push(row["ID"]);
            //   setselectedRowIdArray([...selectedRowIdArray,row["ID"]])
            // }
            
            return (
              <div key={row["ID"]} className="flex items-center justify-start gap-2">
                <input
                  type="checkbox"
                  id={`checkbox-${row["ID"]}`}
                  checked={selectedRowIdArray.includes(row["ID"])}
                  onChange={(e) => onCheckboxSelect(row["ID"], e.target.checked)}
                  className="h-4 w-4"
                />
                <label className="text-sm text-gray-900" htmlFor={`checkbox-${row["ID"]}`}>
                  {typeof row[heading] === "boolean"
                    ? row[heading].toString()
                    : row[heading]}
                </label>
              </div>
            );
          }
          return null;
        });
        return (
          <>
            {results}
            {!hasResults && <span className="text-sm text-gray-900">No Results Found</span>}
          </>
        );
      })()}
    </div>
    <div className="flex gap-3 justify-end mt-3">
      <button
        className="bg-[#F5821F] text-white text-sm px-3 py-1 rounded mr-2 hover:bg-[#e3721b]"
        onClick={()=>handleFilterApply()}
      >
        Apply
      </button>
      <button
        className="bg-gray-300 text-black text-sm px-3 py-1 rounded hover:bg-gray-400"
        onClick={() => setfilterField("")}
      >
        Cancel
      </button>
      <button
        className="bg-gray-300 text-black text-sm px-3 py-1 rounded hover:bg-gray-400"
        onClick={() => setRemoveFilter(true)}
      >
        ClearAll
      </button>
    </div>
  </div>
  )
}

export default FilterBox