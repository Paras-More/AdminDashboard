import React from "react";
function TableView() {
  const data = [
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
      ApiSecret: "SECRET",
      APIKey: "JNPHdc06UUmwOO/eA6uBHQ==",
      CreatedOn: "03DEC2024 16:35:15",
      UpdatedOn: "03DEC2024 16:35:15",
      Expiry: "03DEC2025 23:59:59",
      Status: "ACTIVE",
      InteractiveAllowed: true,
      BroadcastAllowed: true,
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
      Expiry: "03DEC2025 23:59:59",
      Status: "ACTIVE",
      InteractiveAllowed: false,
      BroadcastAllowed: false,
      WebhookURL: "5JbOdMNsy5vaek8lQBrKRw==",
    },
  ];
    
  const columns = Object.keys(data[0]);


  return (
    <>
      <div className="max-w-full h-full bg-red-200 flex shrink-1">
        <table>
          <tr>
            {
              columns?.map((ele,i)=>{
               return(
                <th key={i}>{ele}</th>
               )
              })
            }
          </tr>

          {/* {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                  dangerouslySetInnerHTML={{__html: row[col]}}
                    key={col}
                    className={`px-4 py-2  text-wrap  ${typeof row[col] === "string"? "font-mono": ""
                    } ${col.includes("path") ? "font-mono break- break-all": ""}`}
                  >
                  </td>
                ))}
              </tr>
            ))} */}

            {
              data?.map((row,index)=>(
                <tr>
                  {
                    columns.map((col)=>{
                      if(typeof row[col] === 'boolean'){
                        return(
                          <td>{row[col]? "true" :"false"}</td>
                        )
                      }
                      else{
                        return(
                          <td>{col === 'Expiry' ? <input type="date"/> : row[col] }</td>
                        )
                      }
                    })
                  }
                </tr>
              ))
            }
        </table>
      </div>
    </>
  );
}

export default TableView;
