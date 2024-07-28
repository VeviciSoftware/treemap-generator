import { useState } from 'react';
import TreeMap from './TreeMap';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material'; 

const MainPage = () => {
  const [carSalesData, setCarSalesData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const data = e.target.result;
      if (file.type === 'application/json') {
        const jsonData = JSON.parse(data);
        setCarSalesData(jsonData);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const arrayBuffer = data;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);
        setCarSalesData(excelData);
      }
    };
  
    if (file.type === 'application/json') {
      reader.readAsText(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h1>TreeMap Generator</h1>
      <input
        type="file"
        accept=".json, .xlsx"
        style={{ display: 'none' }}
        id="file-upload"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          Upload File
        </Button>
      </label>
      <div style={{ marginTop: '20px'}}>
          <TreeMap data={carSalesData} />
      </div>
    </div>
  );
};

export default MainPage;