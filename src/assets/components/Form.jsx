import PropTypes from 'prop-types';
import { Box, TextField } from "@mui/material";

const Form = ({ formData, onInputChange }) => (
  <Box sx={{ mt: 2 }}>
    <TextField
      label="Brand"
      name="brand"
      value={formData.brand}
      onChange={onInputChange}
      sx={{ mr: 2 }}
    />
    <TextField
      label="Sales"
      name="sales"
      value={formData.sales}
      onChange={onInputChange}
      sx={{ mr: 2 }}
    />
    <TextField
      label="Percent Change"
      name="percentChange"
      value={formData.percentChange}
      onChange={onInputChange}
      sx={{ mr: 2 }}
    />
  </Box>
);

Form.propTypes = {
  formData: PropTypes.shape({
    brand: PropTypes.string,
    sales: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    percentChange: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Form;