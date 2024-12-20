import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa'; // Import the filter icon

function SortAndFilter() {
  const initialData = [
    {
      ID: "53d7c076ab0d40048c766bf6c930a102",
      Username: "TEST1",
      AppName: "TEST APP NAME",
      ApiSecret: "SECRET",
      APIKey: "JNPHdc06UUmwOO/eA6uBHQ==",
      CreatedOn: "03DEC2024 16:34:42",
      UpdatedOn: "03DEC2024 16:34:42",
      Expiry: "2025-12-03T23:59",
      Status: "EXPIRED",
      InteractiveAllowed: false,
      BroadcastAllowed: false,
      WebhookURL: "JNPHdc06UUmwOO/eA6uBHQ==",
    },
    {
      ID: "81c4f104b70146b5be5c78951fca11cb",
      Username: "TEST2",
      AppName: "TEST APP NAME - 2",
      ApiSecret: "SECRET",
      APIKey: "JNPHdc06UUmwOO/eA6uBHQ==",
      CreatedOn: "03DEC2024 16:35:15",
      UpdatedOn: "03DEC2024 16:35:15",
      Expiry: "2025-12-03T23:59",
      Status: "ACTIVE",
      InteractiveAllowed: true,
      BroadcastAllowed: false,
      WebhookURL: "JNPHdc06UUmwOO/eA6uBHQ==",
    },
    {
      ID: "bb6f3fc4bbd04f7c9fb93b52a040986e",
      Username: "TEST3",
      AppName: "TEST APP NAME - 3",
      ApiSecret: "SECRET",
      APIKey: "5JbOdMNsy5vaek8lQBrKRw==",
      CreatedOn: "03DEC2024 16:37:27",
      UpdatedOn: "03DEC2024 16:37:27",
      Expiry: "2025-12-06T23:59",
      Status: "ACTIVE",
      InteractiveAllowed: true,
      BroadcastAllowed: true,
      WebhookURL: "5JbOdMNsy5vaek8lQBrKRw==",
    },
  ];

  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRow, setSelectedRow] = useState({});
  const [data, setData] = useState(initialData);
  const [activeFilter, setActiveFilter] = useState(null); // Track the active filter column
  const [selectedFilters, setSelectedFilters] = useState({}); // Track selected filters for each column
  const columns = Object.keys(data[0]);

  // Function to get unique filter options from a column
  function getUniqueValues(column) {
    const uniqueValues = [...new Set(data.map(row => row[column]))];
    return uniqueValues;
  }

  function handleSort(Column) {
    const order = sortOrder === 'asc' ? 1 : -1;
    const sortedArray = [...initialData].sort((a, b) => {
      const comparison = a[Column] > b[Column] ? -1 : (a[Column] < b[Column] ? 1 : 0);
      return comparison * order;
    });
    setSortField(Column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setData(sortedArray);
  }

  function toggleFilter(column) {
    setActiveFilter(activeFilter === column ? null : column); // Toggle the filter visibility for the clicked column
  }

  function handleFilterChange(column, value) {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [column]: value,
    }));
  }

  const filteredData = data.filter(row => {
    for (let column in selectedFilters) {
      if (selectedFilters[column] && !selectedFilters[column].includes(row[column])) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="p-4">
      <h1>Data Table</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            {columns?.map((heading, index) => {
              return (
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort(heading)}
                  key={index}
                >
                  {heading}
                  {sortField === heading && (sortOrder === 'asc' ? "↓" : "↑")}
                  <FaFilter
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the sorting
                      toggleFilter(heading);
                    }}
                    className="ml-2 cursor-pointer"
                  />
                  {/* Filter dropdown visible for the active column */}
                  {activeFilter === heading && (
                    <div className="absolute bg-white border shadow-lg mt-1 p-2 w-40">
                      {getUniqueValues(heading).map((opt, i) => (
                        <label key={i} className="block">
                          <input
                            type="checkbox"
                            checked={selectedFilters[heading]?.includes(opt)}
                            onChange={() => {
                              const newValue = selectedFilters[heading]?.includes(opt)
                                ? selectedFilters[heading].filter(val => val !== opt)
                                : [...(selectedFilters[heading] || []), opt];
                              handleFilterChange(heading, newValue);
                            }}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}
                </th>
              );
            })}
            <th className="border p-2 cursor-pointer">Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((row, rowIndex) => {
            return (
              <tr key={row['ID']}>
                {columns?.map((col, colIndex) => {
                  return (
                    <td key={colIndex}>
                      <span>{row[col]}</span>
                    </td>
                  );
                })}
                <td
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedRow(row);
                  }}
                >
                  Edit
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SortAndFilter;
