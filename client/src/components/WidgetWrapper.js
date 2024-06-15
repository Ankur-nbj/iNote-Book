import { Box } from "@mui/material";
import { styled } from "@mui/system";

 const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 1.5rem 1.5rem",
  boxShadow: "black",
  backgroundColor: theme.palette.background.alt,
  // boxShadow: df
  borderRadius: "0.75rem",
}));

export default WidgetWrapper