import { createTheme, Theme } from "@mui/material/styles";

const forestTheme: Theme = createTheme({
    palette: {
        primary: {
            main: '#00A67E'
        },
        secondary: {
            main: '#1A7F64'
        },
        error: {
            main: '#D00E17'
        },
        info: {
            main: '#FFFFFF'
        }
    }
});

export default forestTheme;