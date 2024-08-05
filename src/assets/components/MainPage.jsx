import { useState } from "react";
import TreeMap from "./TreeMap";
import * as XLSX from "xlsx";
import { Container, Typography, Box } from "@mui/material";
import HowToUse from "./HowToUse";
import FileUploader from "./FileUploader";
import Form from "./Form";
import ActionButtons from "./ActionButtons";

const MainPage = () => {
  const [Data, setData] = useState([]);
  const [formData, setFormData] = useState({
    brand: "",
    sales: "",
    percentChange: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

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
        const jsonData = JSON.parse(data);
        setData(jsonData);
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
        setData(excelData);
      }
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteData = () => {
    const updatedData = Data.filter((_, i) => i !== selectedIndex);
    setData(updatedData);
    setSelectedIndex(null);
    setFormData({ brand: "", sales: "", percentChange: "" });
  };
  
  const handleTreeMapClick = (index) => {
    setSelectedIndex(index);
    setFormData(Data[index]);
    setEditIndex(index);
  };
  
  const handleClearData = () => {
    setData([]);
    setFormData({ brand: "", sales: "", percentChange: "" });
    setEditIndex(null);
    setSelectedIndex(null);
  };
  
  const handleAddData = () => {
    if (!formData.brand || !formData.sales || !formData.percentChange) {
      alert("Por favor, preencha todos os campos do formulário.");
      return;
    }

    const newData = {
      ...formData,
      sales: Number(formData.sales),
      percentChange: Number(formData.percentChange),
    };
  
    if (editIndex !== null) {
      const updatedData = Data.map((item, index) =>
        index === editIndex ? newData : item
      );
      setData(updatedData);
      setEditIndex(null);
    } else {
      setData([...Data, newData]);
    }
    setFormData({ brand: "", sales: "", percentChange: "" });
    setSelectedIndex(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        TreeMap Generator
      </Typography>
      <FileUploader onFileUpload={handleFileUpload} />
      <Form formData={formData} onInputChange={handleInputChange} />
      <ActionButtons
        onAddData={handleAddData}
        onUpdateData={handleAddData}
        onDeleteData={handleDeleteData}
        onClearData={handleClearData}
        selectedIndex={selectedIndex}
      />
      <Box sx={{ mt: 2 }} className="treemap-container">
        <TreeMap data={Data} onClick={handleTreeMapClick} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <HowToUse />
      </Box>
    </Container>
  );
};

export default MainPage;