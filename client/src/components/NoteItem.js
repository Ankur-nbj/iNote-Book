import React, { useContext, useState } from "react";
import NoteContext from "../context/Notes/Notecontext";
import {
  CardContent,
  CardActions,
  Card,
  Typography,
  Tooltip,
  Snackbar,
  Alert,
  IconButton,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";
import { DeleteOutline, EditNoteOutlined } from "@mui/icons-material";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deleteNote(note._id);
      setAlertType("success");
      setAlertMessage("Note Deleted Successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      setAlertMessage("Failed to delete note");
      setAlertType("error");
    } finally {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 5000);
    }
  };

  if (!note) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity={alertType} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          <Typography fontWeight="bold" fontSize="clamp(0.5rem, 1.5rem, 2rem)" color="text.secondary" gutterBottom>
            {note.title.length > 20 ? note.title.slice(0, 15) + "..." : note.title}
          </Typography>
          <Typography sx={{ fontSize: 1, fontWeight: "bold" }} color="text.secondary" gutterBottom>
            Description -
          </Typography>
          <Typography variant="body1">
            {note.description.length > 150 ? note.description.slice(0, 130) + "..." : note.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Edit Note">
            <IconButton aria-label="edit" onClick={() => updateNote(note)}>
              <EditNoteOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Note">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Tag">
              <Chip label={note.tag} size="large" sx={{ fontSize: "0.75rem", fontWeight: "bold" }} />
            </Tooltip>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default NoteItem;
