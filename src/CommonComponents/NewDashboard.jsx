import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaFilter } from "react-icons/fa"; 
import Pagination from "./Pagination";
import FilterBox from "./FilterBox";
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
    }
  ];

  const [columns, setColumns] = useState(Object.keys(initialData[0]));
  const [data, setData] = useState(initialData);

  // Handle Drag and Drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const reorderedColumns = [...columns];
    const [removed] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, removed);
    
    setColumns(reorderedColumns);
  };

  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-bwhite flex flex-col items-center">
      <div className="max-w-[100vw] min-h-[92vh] overflow-x-auto">
        <table className="w-full border-collapse border-gray-300 rounded-lg shadow-lg">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns" direction="horizontal">
              {(provided) => (
                <thead ref={provided.innerRef} {...provided.droppableProps}>
                  <tr className="bg-[#F5821F] text-white">
                    {columns.map((heading, index) => (
                      <Draggable key={heading} draggableId={heading} index={index}>
                        {(provided) => (
                          <th
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 text-sm font-semibold cursor-grab"
                          >
                            <div className="flex items-center justify-between">
                              <span>{heading}</span>
                              <button className="p-1 text-white hover:text-gray-200">
                                <FaFilter />
                              </button>
                            </div>
                          </th>
                        )}
                      </Draggable>
                    ))}
                  </tr>
                  {provided.placeholder}
                </thead>
              )}
            </Droppable>
          </DragDropContext>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.ID} className="odd:bg-gray-50 even:bg-white hover:bg-gray-100">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-3 py-2 text-sm text-gray-800">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default NewDashboard
