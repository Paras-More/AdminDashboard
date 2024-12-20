import React, { useState } from "react";
const TableWithFilterAndSort = () => {
  const initialData = [
    {
      ID: "53d7c076ab0d40048c766bf6c930a102",
      Username: "TEST",
      AppName: "TEST APP NAME",
      ApiSecret: "SECRET",
      APIKey: "JNPHdc06UUmwOO/eA6uBHQ==",
      CreatedOn: "03DEC2024 16:34:42",
      UpdatedOn: "03DEC2024 16:34:42",
      Expiry: "03DEC2025 23:59:59",
      Status: "ACTIVE",
      InteractiveAllowed: true,
      BroadcastAllowed: true,
      WebhookURL: "JNPHdc06UUmwOO/eA6uBHQ==",
    },
    {
      ID: "81c4f104b70146b5be5c78951fca11cb",
      Username: "TEST",
      AppName: "TEST APP NAME - 2",
      Expiry: "03DEC2025 23:59:59",
      Status: "PENDING",
      InteractiveAllowed: false,
      BroadcastAllowed: true,
      InteractiveAllowed: true,
      BroadcastAllowed: true,
      WebhookURL: "JNPHdc06UUmwOO/eA6uBHQ==",
    },
    {
      ID: "bb6f3fc4bbd04f7c9fb93b52a040986e",
      Username: "DEMO",
      AppName: "TEST APP NAME - 3",
      Expiry: "03DEC2026 23:59:59",
      Status: "EXPIRED",
      InteractiveAllowed: true,
      BroadcastAllowed: false,
      InteractiveAllowed: true,
      BroadcastAllowed: true,
      WebhookURL: "JNPHdc06UUmwOO/eA6uBHQ==",
    },
  ];
  const [data, setData] = useState(initialData);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  // Function to handle filtering
  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };
  // Function to handle sorting
  const handleSort = (field) => 
    // console.log(field);
    {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortField(field);
    setSortOrder(order);
    setData(sortedData);
  };
  // Function to handle checkbox and calendar changes
  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };
  // Utility function to format Expiry date
  const formatToDateTimeLocal = (dateString) => {
    const months = {
      JAN: "01",
      FEB: "02",
      MAR: "03",
      APR: "04",
      MAY: "05",
      JUN: "06",
      JUL: "07",
      AUG: "08",
      SEP: "09",
      OCT: "10",
      NOV: "11",
      DEC: "12",
    };
    const parts = dateString.split(" ");
    const day = parts[0].padStart(2, "0");
    const month = months[parts[1].toUpperCase()];
    const year = parts[2] ;
    // const time = parts[3].substring(0, 5);
    return `${year}-${month}-${day}`;
  };
  // Filter the data based on filterText
  const filteredData = data.filter((row) =>
    Object.keys(row).some(
      (key) =>
        typeof row[key] === "string" &&
        row[key].toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>
      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter by Username, AppName, or Status"
        value={filterText}
        onChange={handleFilter}
        className="p-2 border rounded mb-4 w-full"
      />
      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("Username")}>
              Username {sortField === "Username" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("AppName")}>
              AppName {sortField === "AppName" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="border p-2">Expiry</th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("Status")}>
              Status {sortField === "Status" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="border p-2">Interactive Allowed</th>
            <th className="border p-2">Broadcast Allowed</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((row, index) => (
            <tr key={row.ID} className="hover:bg-gray-100">
              <td className="border p-2">{row.Username}</td>
              <td className="border p-2">{row.AppName}</td>
              {/* Expiry Calendar */}
              <td className="border p-2">
                <input
                  type="datetime-local"
                  value={formatToDateTimeLocal(row.Expiry)}
                  onChange={(e) => handleInputChange(index, "Expiry", e.target.value)}
                  className="p-1 border rounded"
                />
              </td>
              {/* Status Dropdown */}
              <td className="border p-2">
                <select
                  value={row.Status}
                  onChange={(e) => handleInputChange(index, "Status", e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="EXPIRED">EXPIRED</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                </select>
              </td>
              {/* Checkboxes */}
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={row.InteractiveAllowed}
                  onChange={(e) =>
                    handleInputChange(index, "InteractiveAllowed", e.target.checked)
                  }
                />
              </td>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={row.BroadcastAllowed}
                  onChange={(e) =>
                    handleInputChange(index, "BroadcastAllowed", e.target.checked)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableWithFilterAndSort;