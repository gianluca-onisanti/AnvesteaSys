import {PaletteOptions, PaletteColorOptions, ThemeOptions} from "@mui/material";

interface CustomPaletteOptions extends PaletteOptions {
    hover?: PaletteColorOptions;
}

const darkTheme: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#6fbde0',
        },
        secondary: {
            main: '#00304e',
        },
        background: {
            default: "#474747",
        },
        hover: {
            main:'#375e70',
        },
        boxColor: {
            main: '#303030'
        },
    } as CustomPaletteOptions
}

export default darkTheme;