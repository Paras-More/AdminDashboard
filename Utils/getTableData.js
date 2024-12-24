import axios from "axios"
const getTableData = async ({setEntireData,setbackupData,setData,setTotalPages}) => {
	try{
		const res = await axios.get(`http://192.168.10.121:8020/admincontrol/fetch`,{
			headers: {
				'x-Mirae-Version': 1,
				'X-Auth-Token': "Xpec65IlxQUzAmLBJO5t"
			}
		}
	);
	const fetchedData = res.data;
	setEntireData(fetchedData) 
	setbackupData(fetchedData)            
	// Calculate total pages based on the fetched data length
	const totalPages =
	  fetchedData.length % 10 === 0 ? fetchedData.length / 10 : Math.floor(fetchedData.length / 10) + 1;
	const currentPageData = fetchedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	setData(currentPageData)
	setTotalPages(totalPages);
    return res.data;
	}catch(e){
		console.log(e);
	}
    
};

export default getTableData;