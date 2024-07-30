const Papa = require("papaparse");

// const CSVExport = ({ jsonData, fileName }) => {
//   console.log("JSON Data: " + jsonData);
//   const csv = Papa.unparse(jsonData);
//   const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const csvURL = URL.createObjectURL(csvData);
//   const tempLink = document.createElement("a");
//   tempLink.href = csvURL;
//   tempLink.setAttribute("download", `${fileName}.csv`);
//   document.body.appendChild(tempLink);
//   tempLink.click();
//   document.body.removeChild(tempLink);
// };

function convertJSONtoCSV(jsonData, fileName) {
  // Extract headers from the first object in jsonData
  var headers = Object.keys(jsonData[0]);
  
  // Create CSV content
  var csvContent = headers.join(",") + "\n";

  // Add rows to CSV
  jsonData.forEach(function(row) {
      var values = headers.map(header => row[header]);
      csvContent += values.join(",") + "\n";
  });

  // Create a Blob object for the CSV content
  var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a temporary URL for the Blob object
  var url = URL.createObjectURL(blob);

  // Create a dummy anchor element
  var anchor = document.createElement("a");
  anchor.setAttribute("href", url);
  anchor.setAttribute("download", fileName || "data.csv");

  // Programmatically trigger the download
  anchor.click();

  // Clean up: Revoke the Blob URL
  URL.revokeObjectURL(url);
}

module.exports = {convertJSONtoCSV};
