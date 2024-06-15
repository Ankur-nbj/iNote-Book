import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import ModeToggle from './ModeToggle';

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const theme = useTheme();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const response = await fetch("https://inote-book-ohjb.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      const loggedIn = await response.json();

      if (loggedIn.success) {
        localStorage.setItem('token', loggedIn.token);
        localStorage.setItem('name',loggedIn.name);
        localStorage.setItem('id',loggedIn.userId);
        navigate("/");
      } else {
        setAlertType("warning");
        setAlertMessage("Invalid Credentials");
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage("An unexpected error occurred. Please try again.");
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
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection={isNonMobileScreens ? "row" : "column"}
    >
      {/* Form Box */}
      <Box
        width={isNonMobileScreens ? "30%" : "60%"}
        p="1rem 2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)" color="primary" mx="25%">
          iNoteBook
        </Typography>
        <Typography fontWeight="500" variant="h5" mb={2}>
          To use iNoteBook, please enter your details.
        </Typography>
        
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="10px"
                gridTemplateColumns="repeat(4, 1fr)"
                sx={{
                  "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" },
                  maxHeight: "calc(100vh - 80px)",
                  overflowY: "auto",
                  p: "1rem",
                }}
              >
                <Collapse in={openAlert} sx={{ gridColumn: "span 4" }}>
                  <Alert severity={alertType} sx={{ mb: 2 }}>
                    {alertMessage}
                  </Alert>
                </Collapse>
                
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                 
                <Button
                  type="submit"
                  sx={{
                    gridColumn: "span 4",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.alt,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  LOGIN
                </Button>
                <Typography
                  onClick={() => {
                    navigate("/signup");
                    resetForm();
                  }}
                  sx={{
                    px: "1rem",
                    gridColumn: "span 4",
                    textDecoration: "underline",
                    color: theme.palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                      color: theme.palette.primary.light,
                    },
                  }}
                >
                  Don't have an account? Create Account.
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      
      {/* Side Image */}
      {isNonMobileScreens && (
        <Box
          component="img"
          src="/images/side-img3.jpeg"
          alt="logo"
          sx={{
            height: "100vh",
            width: "50%",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <ModeToggle/>
    </Box>
  );
}

export default Login;
