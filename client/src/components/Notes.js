import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
  Button,
  Grid,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import AddNote from "./AddNote";
import AdvertWidget from "./Advert";
import NoteItem from "./NoteItem";
import NoteContext from "../context/Notes/Notecontext";
import { useFormik } from "formik";
import * as yup from "yup";
import WidgetWrapper from "./WidgetWrapper";
import { Close } from "@mui/icons-material";

const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { palette } = useTheme();
  const [currentNote, setCurrentNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);

  const handleClickOpen = (note) => {
    setCurrentNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup
        .string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      description: yup
        .string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      tag: yup
        .string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await editNote(
          currentNote.id,
          values.title,
          values.description,
          values.tag
        );
        handleClose();
        setAlertMessage("Note Updated Successfully");
        setAlertType("success");
      } catch (error) {
        console.error("Failed to update note", error);
        setAlertMessage("Failed to edit note");
        setAlertType("error");
      } finally {
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 2000);
      }
    },
  });

  if (!Array.isArray(notes)) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display={"block"}>
      <Box
        width="100%"
        height="80vh"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Snackbar open={openAlert} autoHideDuration={3000}>
          <Alert severity={alertType} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <Box flexBasis={isNonMobileScreens ? "60%" : undefined} marginLeft={0}>
          <AddNote />
          <Box width="100%" padding="2rem ">
            <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)">
              Your Notes
            </Typography>
            <Divider sx={{ mb: "2" }} />

            <Box marginTop={2}>
              {notes.length === 0 && "No notes to display."}
              <Grid container spacing={3}>
                {notes.map((note) => (
                  <Grid item key={note._id} xs={12} sm={6}>
                    <WidgetWrapper>
                      <NoteItem
                        key={note._id}
                        updateNote={handleClickOpen}
                        note={note}
                      />
                    </WidgetWrapper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
        {/* <Divider sx={{color: "black", marginBottom: "2rem"}}/> */}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{
              fontWeight: "bold",
              fontSize: "clamp(1rem, 1.5rem, 2rem)",
              color: "primary",
            }}
          >
            Edit Note
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="dense"
                id="title"
                name="title"
                label="Title"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                margin="dense"
                id="tag"
                name="tag"
                label="Tag"
                fullWidth
                value={formik.values.tag}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tag && Boolean(formik.errors.tag)}
                helperText={formik.touched.tag && formik.errors.tag}
              />
              <DialogActions>
                <Button
                  type="submit"
                  color="primary"
                  disabled={!formik.isValid || formik.isSubmitting}
                  sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Save Changes
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "25%" : undefined}>
            <AdvertWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Notes;
