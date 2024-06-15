import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Alert,
  Collapse,
} from "@mui/material";
import  { Formik } from "formik";
import * as yup from "yup";
import { useNavigate} from 'react-router-dom';
import ModeToggle from './ModeToggle';


const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  cpassword: yup.string()
  .oneOf([yup.ref('password'), null], "Passwords must match")
  .required("required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

const Signup = () => {
 const theme= useTheme();
 const [alertMessage, setAlertMessage] = useState("");
 const [alertType, setAlertType] = useState("");
 const [openAlert, setOpenAlert] = useState(false);
 const { palette } = useTheme();
 const navigate = useNavigate();
 const isNonMobile = useMediaQuery("(min-width:600px)");
 const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

 const handleFormSubmit = async (values, onSubmitProps) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      setAlertType("success");
      setAlertMessage("Successfully Signed Up");
    } else {
      setAlertType("warning");
      setAlertMessage("User already exits. Login");
    }
  } catch (err) {
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
           width={isNonMobileScreens ? "30%" : "90%"}
           p="1rem 2rem"
           m="1rem auto"
           borderRadius="1.5rem"
           backgroundColor={theme.palette.background.alt}
         >
           <Typography fontWeight="bold"
           fontSize="clamp(1rem, 2rem, 2.25rem)"
           color="primary" mx="25%">iNoteBook</Typography>
           <Typography fontWeight="500" variant="h5" >
               To use iNoteBook, Please enter your details. 
           </Typography>
           

           <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="10px"
            gridTemplateColumns="repeat(4, 1fr)"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ 
                    gridColumn: "span 4",
                    "& .MuiInputBase-root": {
                      fontSize: "14px"
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px"
                    }
                  }}
                />
            

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ 
                gridColumn: "span 4",
                "& .MuiInputBase-root": {
                  fontSize: "14px"
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px"
                }
              }}
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
              sx={{ 
                gridColumn: "span 4",
                "& .MuiInputBase-root": {
                  fontSize: "14px"
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px"
                }
              }}
            />
              <TextField
                label="Confirm Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cpassword}
                name="cpassword"
                error={Boolean(touched.cpassword) && Boolean(errors.cpassword)}
                helperText={touched.cpassword && errors.cpassword}
                sx={{ 
                  gridColumn: "span 4",
                  "& .MuiInputBase-root": {
                    fontSize: "14px"
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "14px"
                  }
                }}
              />
            
             <Button
              type="submit"
              sx={{
                gridColumn: "span 4",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
            REGISTER
            </Button>
            <Typography
              onClick={() => {
                navigate("/login")
                resetForm();
              }}
              sx={{
                px: "1rem",
                gridColumn: "span 4",
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              Already have an account? Login here.
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

export default Signup;