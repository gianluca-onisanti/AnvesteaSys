import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import React from "react";
import {useTheme} from "@mui/system";
import Typography from "@mui/material/Typography";
import {Box, Tooltip, useMediaQuery} from "@mui/material";

export type ThemeToggleButtonProps = {
    ColorModeContext: React.Context<{ toggleColorMode: () => void; }>,
}

const ThemeToggleButton = (props: ThemeToggleButtonProps) => {
    const mobileCheck = useMediaQuery('(min-width: 500px)');
    const {    ColorModeContext = React.createContext({ toggleColorMode: () => {} })} = props;
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <>
            {mobileCheck && (
                <Typography sx={{ color: "#ffffff" }} >{theme.palette.mode === 'dark' ? "Escuro" : "Claro"}</Typography>)
            }
            <Tooltip title={"Tema " + (theme.palette.mode === 'dark' ? "Escuro" : "Claro") }>
            <IconButton sx={{mr: 2, color: "#ffffff"}} aria-label={theme.palette.mode + ' mode button'} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
            </IconButton>
            </Tooltip>
        </>)
}

export default ThemeToggleButton;