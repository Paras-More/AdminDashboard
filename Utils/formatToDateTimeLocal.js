const formatToDateTimeLocal = (dateString) => {
    // Check if the input is in the correct format (e.g., "DDMMMYYYY HH:MM:SS")
    const months = {
      JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
      JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12"
    };
    // If the date string contains spaces (expected format like "03DEC2025 23:59:59")
    if (dateString.includes(" ")) {
      const parts = dateString.split(" ");
      const day = parts[0].substring(0, 2); // Get the day (first two digits)
      const month = months[parts[0].substring(2, 5)]; // Get the month (3-letter abbreviation)
      const year = parts[0].substr(-4); // Get the last four digits as year
      const time = parts[1]; // The time part (HH:MM:SS)
      // Ensure the format is correct
      if (!month || !day || !year || !time) {
        return ""; // If parts are missing, return an empty string (or handle error)
      }
      return `${year}-${month}-${day}T${time}`;
    }
    // If the input is an ISO string (e.g., "2025-12-03T23:59:59")
    const date = new Date(dateString); // Create a Date object
    if (isNaN(date)) {
      return ""; // If the date is invalid, return an empty string (or handle error)
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };
  

export default formatToDateTimeLocal;