// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Header = () => {
//   const { logout } = useContext(AuthContext);

//   return (
//     <AppBar position="static">
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="h6">Fabric Admin Portal</Typography>
//         <Button color="inherit" onClick={logout}>
//           Logout
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const Header = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ ml: 2 }}>
            Fabric Admin Portal
          </Typography>
        </Box>

        <Box>
          <Button
            endIcon={<ExpandMoreIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Admin User
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
          </Menu>

          <Button
            variant="contained"
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;