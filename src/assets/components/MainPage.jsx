import { useState, useEffect } from "react";
import TreeMap from "./TreeMap";
import * as XLSX from "xlsx";
import { Button, Container, Typography, Box, TextField } from "@mui/material";
import HowToUse from "./HowToUse";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MainPage = () => {
  const [Data, setData] = useState([]);
  const [formData, setFormData] = useState({
    brand: "",
    sales: "",
    percentChange: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".treemap-container")) {
        setSelectedIndex(null);
        setFormData({ brand: "", sales: "", percentChange: "" });
        setEditIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  const handleAddData = () => {
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

  const handleDeleteData = (index) => {
    const updatedData = Data.filter((_, i) => i !== index);
    setData(updatedData);
    setSelectedIndex(null);
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
        <TextField
          label="Brand"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Sales"
          name="sales"
          value={formData.sales}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Percent Change"
          name="percentChange"
          value={formData.percentChange}
          onChange={handleInputChange}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleAddData}
          disabled={selectedIndex !== null}
          sx={{ mr: 2 }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={handleAddData}
          startIcon={<EditIcon />}
          disabled={selectedIndex === null}
          sx={{ mr: 2 }}
        >
          Update
        </Button>
        {selectedIndex !== null && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteData(selectedIndex)}
            startIcon={<DeleteIcon />}
            sx={{ mr: 2, minWidth: "auto", padding: "6px" }}
          />
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearData}
          sx={{ mr: 2 }}
        >
          Clear
        </Button>
      </Box>
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
