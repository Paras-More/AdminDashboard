import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NewTable from "./CommonComponents/NewTable";
import TableWithFilterAndSort from "./CommonComponents/FilterTable";
import SortAndFilter from "./CommonComponents/SortAndFilter";
import ApiTable from "./CommonComponents/ApiTable";
import ApiForm from "./CommonComponents/APiForm";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <ApiTable /> */}
      {/* <ApiForm /> */}
      <NewTable />
      {/* <SortAndFilter/> */}
      {/* <TableWithFilterAndSort/> */}
    </>
  );
}

export default App;
