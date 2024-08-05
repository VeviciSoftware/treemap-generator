import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ActionButtons = ({
  onAddData,
  onUpdateData,
  onDeleteData,
  onClearData,
  selectedIndex,
}) => (
  <Box sx={{ mt: 2 }}>
    <Button
      variant="contained"
      onClick={onAddData}
      disabled={selectedIndex !== null}
      sx={{ mr: 2 }}
    >
      Add
    </Button>
    <Button
      variant="contained"
      onClick={onUpdateData}
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
        onClick={onDeleteData}
        startIcon={<DeleteIcon />}
        sx={{ mr: 2, minWidth: "auto", padding: "6px" }}
      >
        Delete
      </Button>
    )}
    <Button
      variant="contained"
      color="secondary"
      onClick={onClearData}
      sx={{ mr: 2 }}
    >
      Clear
    </Button>
  </Box>
);

ActionButtons.propTypes = {
  onAddData: PropTypes.func.isRequired,
  onUpdateData: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
  onClearData: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number,
};

export default ActionButtons;
