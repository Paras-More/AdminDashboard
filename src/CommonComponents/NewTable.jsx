import React, { useEffect, useSyncExternalStore } from "react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa"; // Import the filter icon
import Pagination from "./Pagination";
import FilterBox from "./FilterBox";
import formatToDateTimeLocal from "../../Utils/formatToDateTimeLocal";
import getTableData from "../../Utils/getTableData";
import axios from "axios";

function NewTable() {
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
  const [entireData, setEntireData] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterField, setfilterField] = useState("");
  const [filterText, setfilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [removeFilter, setRemoveFilter] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState(initialData);
  const columns = Object.keys(initialData[0]);
  const [selectedRowIdArray, setselectedRowIdArray] = useState([]);
  const [backupData, setbackupData] = useState([]);
  const pageSize = 10;

  const handleInputChange = (index, key, value) => {
    console.log("val", value);
    console.log("key", key);
    console.log("in", index);

    const updatedData = { ...selectedRow };
    updatedData[key] = value;
    setSelectedRow(updatedData);
  };
  async function getData() {
    try {
      const res = await axios.get(
        "http://192.168.10.145:8020/admincontrol/fetch",
        {
          headers: {
            "x-Mirae-Version": 1,
            "X-Auth-Token": "Xpec65IlxQUzAmLBJO5t",
          },
        }
      );

      const fetchedData = res.data || initialData;
      setEntireData(fetchedData);
      setbackupData(fetchedData);
      // Calculate total pages based on the fetched data length
      const totalPages =
        fetchedData.length % 10 === 0
          ? fetchedData.length / 10
          : Math.floor(fetchedData.length / 10) + 1;
      const currentPageData = fetchedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
      setData(currentPageData);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function handleSaveRow(rowId, row, rowIndex) {
    alert("calling api");
    const obj = {
      ID: `${rowId}`,
      Username: `${selectedRow["Username"]}`,
      Expiry: `${selectedRow["Expiry"]}`,
      Status: `${selectedRow["Status"]}`,
      InteractiveAllowed: selectedRow["InteractiveAllowed"],
      BroadcastAllowed: selectedRow["BroadcastAllowed"],
    };
    try {
      const res = await axios.put(
        import.meta.env.VITE_EDIT_TABLE_DATA_API,
        obj,
        {
          headers: {
            "Content-Type": "application/json",
            "x-Mirae-Version": 1,
            "X-Auth-Token": "Xpec65IlxQUzAmLBJO5t",
          },
        }
      );
      console.log(res);
      // return;

      getTableData({
        setEntireData,
        setbackupData,
        setData,
        setTotalPages,
        currentPage,
        pageSize,
      });

      setSelectedRow({});
    } catch (e) {
      console.log(e);
      alert("something went wrong while updating the table row");
    }
  }
  function handleSort(Column) {
    const order = sortOrder === "asc" ? 1 : -1;
    const sortedArray = [...entireData].sort((a, b) => {
      const comparison =
        a[Column] > b[Column] ? -1 : a[Column] < b[Column] ? 1 : 0;
      return comparison * order;
    });
    setSortField(Column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setEntireData(sortedArray);
  }
  function openFilterBox(Column) {
    setfilterField(filterField === "" || filterField !== Column ? Column : "");
    setfilterText("");
  }
  function onCheckboxSelect(rowId, isChecked) {
    if (isChecked) {
      const oldArray = [...selectedRowIdArray, rowId];
      setselectedRowIdArray(oldArray);
    } else {
      setIsAllSelected(false);
      let newselectedRowIdArray = selectedRowIdArray.filter(
        (id) => id !== rowId
      );
      setselectedRowIdArray(newselectedRowIdArray);
    }
  }
  function handleFilterApply() {
    if (selectedRowIdArray.length !== 0) {
      const filteredArray = entireData.filter((row, rowIndex) => {
        return selectedRowIdArray.includes(row["ID"]);
      });
      setEntireData(filteredArray);
      setfilterField("");
      setCurrentPage(1);
      setselectedRowIdArray([]);
      setIsAllSelected(false);
    } else {
      alert("Please select any value or cancel");
    }
  }
  async function handleEditRow(rowID, row) {
    setSelectedRow(row);
  }
  function handleSelectAllcheckBox(isChecked, clearAll) {
    if (!isChecked && clearAll) {
      setIsAllSelected(isChecked);
      setselectedRowIdArray([]);
    } else {
      setIsAllSelected(isChecked);
    }
  }
  useEffect(() => {
    // ****Below function is  For testing below function of own server **********
    // getData();

    // **** Below function is actual function which will call real api**********
    getTableData({
      setEntireData,
      setbackupData,
      setData,
      setTotalPages,
      currentPage,
      pageSize,
    });
  }, []);

  useEffect(() => {
    // Setting only the data which will show based on current page
    const currentPageData = entireData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    setData(currentPageData);
  }, [currentPage, entireData]);

  useEffect(() => {
    // Setting Total Pages
    const totalPages =
      entireData.length % 10 === 0
        ? entireData.length / 10
        : Math.floor(entireData.length / 10) + 1;
    setTotalPages(totalPages);
  }, [entireData]);

  useEffect(() => {
    // This is will remove filter
    if (removeFilter) {
      setEntireData(backupData);
      setRemoveFilter(false);
    }
  }, [removeFilter]);

  return (
    <div className=" max-w-[100vw] z-20 min-h-[100vh] max-h-[100vh] bg-bwhite flex flex-col items-center justify-between ">
      <div className="max-w-[100vw]  min-h-[92vh] overflow-x-auto z-50 ">
        <table className="w-full z-20 border-collapse  border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-[#F5821F]  text-white text-left">
              {columns?.map((heading, index) => (
                <th
                  className="p-3  cursor-pointer text-sm relative font-semibold"
                  key={index}
                >
                  <div className="flex items-center  justify-between">
                    <span
                      onClick={() => handleSort(heading)}
                      className="flex-1"
                    >
                      {heading}
                      {sortField === heading &&
                        (sortOrder === "asc" ? " ↓" : " ↑")}
                    </span>
                    <button
                      className="p-1 text-white hover:text-gray-200"
                      onClick={() => openFilterBox(heading)}
                    >
                      <FaFilter />
                    </button>
                  </div>
                  {filterField === heading && (
                    <FilterBox
                      heading={heading}
                      setfilterText={setfilterText}
                      handleSelectAllcheckBox={handleSelectAllcheckBox}
                      isAllSelected={isAllSelected}
                      entireData={entireData}
                      filterText={filterText}
                      selectedRowIdArray={selectedRowIdArray}
                      onCheckboxSelect={onCheckboxSelect}
                      handleFilterApply={handleFilterApply}
                      setfilterField={setfilterField}
                      setselectedRowIdArray={setselectedRowIdArray}
                      setRemoveFilter={setRemoveFilter}
                    />
                  )}
                </th>
              ))}
              <th className="p-3 text-sm uppercase font-semibold text-[#1A396]">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="overflow-x-scroll">
            {data?.map((row, rowIndex) => (
              <tr
                key={row["ID"]}
                className="odd:bg-gray-50 even:bg-white hover:bg-gray-100"
              >
                {columns?.map((col, colIndex) => (
                  <td
                    className="px-3 py-2 text-sm text-gray-800"
                    key={colIndex}
                  >
                    {col === "Expiry" ? (
                      <input
                        type="datetime-local"
                        className={`${
                          row["ID"] !== selectedRow["ID"] &&
                          "cursor-not-allowed text-gray-600"
                        }`}
                        value={
                          row["ID"] !== selectedRow["ID"]
                            ? formatToDateTimeLocal(row[col])
                            : formatToDateTimeLocal(selectedRow[col])
                        }
                        // value={selectedRow[col]}
                        onChange={(e) =>
                          handleInputChange(rowIndex, col, e.target.value)
                        }
                        disabled={row["ID"] !== selectedRow["ID"]}
                      />
                    ) : col === "Status" ? (
                      <select
                        className={`${
                          row["ID"] !== selectedRow["ID"] &&
                          "cursor-not-allowed text-gray-600"
                        }`}
                        value={
                          row["ID"] !== selectedRow["ID"]
                            ? row[col]
                            : selectedRow[col]
                        }
                        onChange={(e) =>
                          handleInputChange(rowIndex, col, e.target.value)
                        }
                        disabled={row["ID"] !== selectedRow["ID"]}
                      >
                        {["ACTIVE", "PENDING", "EXPIRED", "SUSPENDED"]?.map(
                          (opt, i) => (
                            <option key={i}>{opt}</option>
                          )
                        )}
                      </select>
                    ) : col === "InteractiveAllowed" ||
                      col === "BroadcastAllowed" ? (
                      <input
                        type="checkbox"
                        className={`${
                          row["ID"] !== selectedRow["ID"] &&
                          "cursor-not-allowed"
                        }`}
                        checked={
                          row["ID"] !== selectedRow["ID"]
                            ? row[col]
                            : selectedRow[col]
                        }
                        onChange={(e) =>
                          handleInputChange(rowIndex, col, e.target.checked)
                        }
                        disabled={row["ID"] !== selectedRow["ID"]}
                      />
                    ) : col === "WebhookURL" ? (
                      <span>
                        {row["ID"] !== selectedRow["ID"]
                          ? row[col]
                          : selectedRow[col]}
                      </span>
                    ) : (
                      <span>
                        {row["ID"] !== selectedRow["ID"]
                          ? row[col]
                          : selectedRow[col]}
                      </span>
                    )}
                  </td>
                ))}
                <td className="p-3 text-[#F5821F] font-semibold cursor-pointer">
                  {selectedRow["ID"] === row["ID"] ? (
                    <button
                      className="bg-transparent"
                      onClick={() => handleSaveRow(row["ID"], row, rowIndex)}
                    >
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEditRow(row["ID"], row)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default NewTable;
