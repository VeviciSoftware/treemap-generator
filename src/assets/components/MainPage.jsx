import { useState } from "react";
import TreeMap from "./TreeMap";
import * as XLSX from "xlsx";
import { Button, Container, Typography, Box } from "@mui/material";
import HowToUse from "./HowToUse";

const MainPage = () => {
  const [Data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    // Dependendo do tipo do arquivo, a leitura é feita de forma diferente.
    if (file.type === "application/json") {
      reader.readAsText(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      reader.readAsArrayBuffer(file);
    }
  
    reader.onload = (e) => {
      const data = e.target.result;
      if (file.type === "application/json") {
        const jsonData = JSON.parse(data); // Converte o arquivo JSON em um objeto JavaScript.
        setData(jsonData);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const arrayBuffer = data; // Converte o arquivo XLSX em um ArrayBuffer.
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { // Lê o arquivo XLSX.
          type: "array",
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
  
        const excelData = XLSX.utils.sheet_to_json(worksheet); // Converte a planilha em um objeto JSON.
        setData(excelData); // Atualiza o estado com o JSON gerado.
      }
    };
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
      <Box sx={{ mt: 2 }}>
        <TreeMap data={Data} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <HowToUse />
      </Box>
    </Container>
  );
};

export default MainPage;