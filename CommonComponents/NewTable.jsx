import React, { useEffect } from "react";
import { useState } from "react";
function NewTable() {
  const initialData = [
    {
      ID: "53d7c076ab0d40048c766bf6c930a102",
      Username: "TEST",
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
      Username: "TEST",
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
      Username: "TEST",
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

  const optionArray = ["ACTIVE", "PENDING", "EXPIRED", "SUSPENDED"];
  const [selectedRow,setSelectedRow] = useState({})
  const [data, setData] = useState(initialData);
  const columns = Object.keys(data[0]);
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
    const time = parts[3].substring(0, 5);
    return `${year}-${month}-${day}`;
  };

  function setDateFormat(date) {}

  const handleInputChange = (index, key, value) => {
    const updatedData = {...selectedRow};
    updatedData[key] = value;
    setSelectedRow(updatedData);
  };

  function handleSaveRow(rowId,rowIndex){
    alert("calling api")
    const copiedData = [...data];
    copiedData[rowIndex] = selectedRow;
    setData(copiedData)
    setSelectedRow({})
    
  }
   
  useEffect(()=>{
    console.log(selectedRow);
    console.log(selectedRow['ID']);
  },[selectedRow])

  function handleEditRow(rowID,row){
    setSelectedRow(row)
  }

  return (
    <div className="p-4">
      <h1>Data Table</h1>
      <input
        type="text"
        placeholder="Filter by username , Appname , or Status"
        className="w-full p-4"
      />
      <table className="w-full table-auto  border-collapse border border-gray-300">
       <thead>
          <tr>
            {/* Heeading */}
            {
                columns?.map((heading,index)=>{
                    return(
                        <th className="border p-2 cursor-pointer" key={index}>{heading}</th>
                    )
                })
            }
            {
                // Edit Heading column
                <th className="border p-2 cursor-pointer">Edit</th>
            }
          </tr>
      </thead>
      <tbody>
          {data?.map((row, rowIndex) => {
            return (
              <tr key={row['ID']}>
                {columns?.map((col, colIndex) => {
                  return (
                    <td key={colIndex}>
                      {col === "Expiry" ? (
                        <div className=" cursor-not-allowed">
                          <input
                            type="datetime-local"
                            // disabled={row['ID'] !== selectedRow['ID'] ? true : false}
                            className={`${row['ID'] !== selectedRow['ID'] && "disable-me"}` }
                            value={row['ID'] !== selectedRow['ID'] ? row[col] : selectedRow[col]}
                            onChange={(e) => {
                              handleInputChange(rowIndex, col, e.target.value);
                            }}
                          />
                        </div>
                      ) : col === "Status" ? (
                        <select 
                        disabled={row['ID'] !== selectedRow['ID'] ? true : false}
                        className={`${row['ID'] !== selectedRow['ID'] && "cursor-not-allowed"}` }
                          onChange={(e) => {
                            handleInputChange(rowIndex, col, e.target.value);
                          }}
                        >
                          {optionArray?.map((opt, i) => {
                            return <option  key={i}>{opt}</option>;
                          })}
                        </select>
                      ) : col === "InteractiveAllowed" ||
                        col === "BroadcastAllowed" ? (
                            <input
                            disabled={row['ID'] !== selectedRow['ID'] ? true : false}
                            className={`${row['ID'] !== selectedRow['ID'] && "cursor-not-allowed"}` }
                            type="checkbox"
                            checked={row['ID'] !== selectedRow['ID'] ? row[col] : selectedRow[col]}
                            onChange={(e) =>
                                handleInputChange(rowIndex, col, e.target.checked)
                            }
                            />
                      ) : col === "WebhookURL" ? (
                        <span>{row['ID'] !== selectedRow['ID'] ? row[col] : selectedRow[col]}</span>
                      ) : (
                        <span>{row['ID'] !== selectedRow['ID'] ? row[col] : selectedRow[col]}</span>
                      )
                      }
                    </td>
                  );
                })}
                {
                  selectedRow['ID'] === row['ID'] ? <td className='cursor-pointer' key={row['ID']} onClick={()=>handleSaveRow(row['ID'],rowIndex)}>Save</td>  : <td className='cursor-pointer' key={row['ID']} onClick={()=>handleEditRow(row['ID'],row)}>Edit</td> 
                }
                
              </tr>
            );
          })}
      </tbody>
      </table>
    </div>
  );
}

export default NewTable;
