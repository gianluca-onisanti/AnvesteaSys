import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { useTheme } from "@mui/system";

export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

const Header = (props: HeaderProps) => {

  const { ColorModeContext } = props;
  const theme = useTheme();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.secondary.main , marginBottom: "40px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ color:"#ffffff", display: { xs: "none", md: "flex", }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Anvestea's RPG
          </Typography>
          <AdbIcon sx={{ color:"#ffffff", display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            Anvestea's RPG
          </Typography>
          <div style={{marginRight: '1100px'}} />
          <ThemeToggleButton ColorModeContext={ColorModeContext} />
        </Toolbar>
      </Container>
    </AppBar>

  );
};
export default Header;
