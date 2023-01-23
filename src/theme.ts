import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
    palette: {
      primary: {
        main: 'rgba(165, 224, 163, 0.49)',
        dark: '#72A276',
        light: 'rgba(255, 255, 255, 0.49)'
      },
      secondary: {
        main: 'rgba(255, 255, 255, 0.49)'
      },
      error: {
        main: red.A400,
      },
      background: {
        default: 'rgba(165, 224, 163, 0.31)',
      },
    },
    typography: {
      allVariants: {
        color: "black",
        fontFamily: "Times New Roman",
        fontWeight: "800"
      }
    }
  });
  export default theme;