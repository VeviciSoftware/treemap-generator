import PropTypes from 'prop-types';
import { Button } from "@mui/material";

const FileUploader = ({ onFileUpload }) => (
  <>
    <input
      type="file"
      accept=".json, .xlsx"
      style={{ display: "none" }}
      id="file-upload"
      onChange={onFileUpload}
    />
    <label htmlFor="file-upload">
      <Button variant="contained" component="span">
        Upload File
      </Button>
    </label>
  </>
);

FileUploader.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FileUploader;