async function handleSaveRow(rowId, row, rowIndex) {
  const obj = {
    ID: `${rowId}`,
    Username: `${selectedRow["Username"]}`,
    Expiry: `${selectedRow["Expiry"]}`,
    Status: `${selectedRow["Status"]}`,
    InteractiveAllowed: selectedRow["InteractiveAllowed"],
    BroadcastAllowed: selectedRow["BroadcastAllowed"],
  };
  try {
    const res = await axios.put(import.meta.env.VITE_EDIT_TABLE_DATA_API, obj, {
      headers: {
        "Content-Type": "application/json",
        "x-Mirae-Version": 1,
        "X-Auth-Token": "Xpec65IlxQUzAmLBJO5t",
      },
    });
    console.log(res);
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

export default handleSaveRow;
