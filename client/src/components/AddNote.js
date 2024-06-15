import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
  Snackbar,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import NoteContext from "../context/Notes/Notecontext"; // Adjust the path to NoteContext

const AddNote = () => {
  const theme = useTheme();
  const { addNote } = useContext(NoteContext); // Accessing addNote function from NoteState context
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const initialValuesAddNote = {
    title: "",
    description: "",
    tag: "",
  };

  const addNoteSchema = yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    tag: yup.string().required("Required"),
  });

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await addNote(values.title, values.description, values.tag);
      onSubmitProps.resetForm(); // Reset the form after successful submission
      setAlertMessage("Note Added");
      setAlertType("success");
    } catch (error) {
      console.error("Error adding note:", error);
      setAlertMessage("Failed to add note");
      setAlertType("error");
    } finally {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 2000); // Close the alert after 2 seconds
      onSubmitProps.resetForm();
    }
  };

  return (
    <Box
      width={isNonMobileScreens ? "70%" : "90%"}
      p="2rem 2rem"
      m="auto"
      borderRadius="1.25rem"
      backgroundColor={theme.palette.background.alt}
    >
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary"
        // mx="25%"
      >
        Add a Note
      </Typography>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesAddNote}
        validationSchema={addNoteSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="10px"
              gridTemplateColumns="repeat(4, 1fr)"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                maxHeight: "calc(100% - 80px)",
                overflowY: "auto",
                p: "1rem",
              }}
            >
              <Snackbar
                open={openAlert}
                autoHideDuration={3000}
              >
                <Alert
                  severity={alertType}
                  sx={{ width: "100%" }}
                >
                  {alertMessage}
                </Alert>
              </Snackbar>

              <TextField
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={Boolean(touched.title) && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputBase-root": {
                    fontSize: "14px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                  },
                }}
              />

              <TextField
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                multiline
                rows={4}
                name="description"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputBase-root": {
                    fontSize: "14px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                  },
                }}
              />

              <TextField
                label="Tag"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tag}
                name="tag"
                error={Boolean(touched.tag) && Boolean(errors.tag)}
                helperText={touched.tag && errors.tag}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiInputBase-root": {
                    fontSize: "14px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                  },
                }}
              />

              <Button
                type="submit"
                sx={{
                  gridColumn: "span 2",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Add a Note
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddNote;
