import { useState } from "react";
import TreeMap from "./TreeMap";
import * as XLSX from "xlsx";
import { Button, Container, Typography } from "@mui/material";
import HowToUse from "./HowToUse";

const MainPage = () => {
  const [carSalesData, setCarSalesData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      if (file.type === "application/json") {
        const jsonData = JSON.parse(data);
        setCarSalesData(jsonData);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const arrayBuffer = data;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: "array",
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);
        setCarSalesData(excelData);
      }
    };

    if (file.type === "application/json") {
      reader.readAsText(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        TreeMap Generator
      </Typography>
      <input
        type="file"
        accept=".json, .xlsx"
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          Upload File
        </Button>
      </label>
      <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <TreeMap data={carSalesData} />
        </div>
        <HowToUse />
      </div>
    </Container>
  );
};

export default MainPage;
