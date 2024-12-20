import React, { useEffect } from "react";
import { useState } from "react";
import { FaFilter } from 'react-icons/fa'; // Import the filter icon

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
  const [sortField,setSortField] = useState("")
  const[sortOrder,setSortOrder] = useState('asc')
  const[filterField,setfilterField] = useState("")
  const[filterText,setfilterText] = useState("")
  const[SearchNotFound,setSearchNotFound] = useState(false)
  const optionArray = ["ACTIVE", "PENDING", "EXPIRED", "SUSPENDED"];
  const [selectedRow,setSelectedRow] = useState({})
  const [data, setData] = useState(initialData);
  const columns = Object.keys(data[0]);

  function setDateFormat(date) {}

  const handleInputChange = (index, key, value) => {
    const updatedData = {...selectedRow};
    updatedData[key] = value;
    setSelectedRow(updatedData);
  };

  function handleSaveRow(rowId,rowIndex){
    alert("calling api")
    const copiedData = [...data];
    console.log(copiedData[rowIndex]);
    copiedData[rowIndex] = selectedRow;
    setData(copiedData)
    setSelectedRow({})
    
  }

  function handleSort(Column){
    const order = sortOrder === 'asc' ? 1 : -1;
    const sortedArray = [...initialData].sort((a,b)=>{
      const comparison = a[Column] > b[Column] ? -1 : (a[Column] < b[Column] ? 1 : 0);
      return comparison * order;
    })
    setSortField(Column)
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setData(sortedArray)
  }

  function handleFilter(Column){      
      setfilterField(filterField === "" || filterField !== Column ? Column : "");   
  }
   
  useEffect(()=>{
    // console.log("sortOrder",sortOrder);
  },[sortOrder])

  function handleEditRow(rowID,row){
    setSelectedRow(row)
  }
  useEffect(() => {
    // console.log(data);
    console.log(filterText);
  }, [filterText]);

  return (
    <div className="p-4">
      <h1>Data Table</h1>

      <table className="w-full table-auto  border-collapse border border-gray-300">
       <thead>
          <tr>
            {/* Heeading */}
            {
                columns?.map((heading,index)=>{
                    return(
                        <th className="border bg-red-200  p-2 cursor-pointer" key={index}>
                          <div className="flex items-center relative justify-between bg-green-500">
                            <div className="w-full" onClick={()=>handleSort(heading)}>
                            {heading}
                            {sortField === heading && (sortOrder === 'asc'? "↓" :"↑")}
                            </div>
                            <div className="p-1" onClick={()=>handleFilter(heading)}>
                            {<FaFilter/>}
                            </div>
                            {
                              filterField === heading &&   
                              <div className="absolute z-50 top-6 right-0 w-[full] max-w-[280px] h-max bg-white shadow-md p-3">
                              <div className="flex items-center justify-between mb-2">
                                <input type="text" placeholder="Search" className="w-full p-1 text-sm border border-gray-300 rounded-md" onChange={(e)=>setfilterText(e.target.value)}/>
                              </div>
                              <div className="flex items-center mb-3">
                                <input type="checkbox" id="selectAll" className="h-4 w-4" />
                                <label htmlFor="selectAll" className="ml-2 text-sm">Select All</label>
                              </div>
                              <div className="flex flex-col max-h-60 overflow-y-auto px-2">
                                {
                                  [...data].map((row, rowIndex) => {                                   
                                    return (
                                      <div key={row['ID']} className="flex items-center justify-between py-1">
                                        {
                                          row[heading].toLowerCase().includes(filterText) && <><input type="checkbox" id={`checkbox-${row['ID']}`}  className="h-4 w-4"  />
                                        <label className="ml-2 text-sm" htmlFor={`checkbox-${row['ID']}`} >{row[heading]}</label></> 
                                        }
                                      </div>
                                    );
                                  })
                                }
                                {
                                  
                                }
                              </div>
                                <div className="flex justify-end mt-3">
                                  <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded mr-2">OK</button>
                                  <button className="bg-gray-300 text-black text-sm px-3 py-1 rounded" onClick={()=>setfilterField("")}>Cancel</button>
                                </div>
                              </div>
                             }
                          </div>
                        </th>
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
