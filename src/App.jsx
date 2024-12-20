import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NewTable from './CommonComponents/NewTable'
import TableWithFilterAndSort from './CommonComponents/FilterTable'
import SortAndFilter from './CommonComponents/SortAndFilter'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NewTable/>
      {/* <SortAndFilter/> */}
      {/* <TableWithFilterAndSort/> */}
    </>
  )
}

export default App
