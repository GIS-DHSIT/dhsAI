import { AppBar, Toolbar, Box } from "@mui/material";
import dhsLogo from "../assets/dhs-logo.png";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ background: "#1a2639", paddingX: 2, top: 0, left: 0, right: 0 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "48px !important", }}>
        <div className="logo">
          <div className="logo-icon"><svg viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
          <span className="logo-text">Fabric<span>Shift</span></span>
        </div>
        <Box
          sx={{
            background: "#1e40af",
            borderRadius: 2,
            paddingTop: 0.5,
          }}
        >
          <img src={dhsLogo} width={80} alt="dhs-log" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;