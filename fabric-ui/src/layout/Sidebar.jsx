import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const drawerWidth = 220;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        <ListItemButton
          selected={location.pathname === "/"}
          onClick={() => navigate("/")}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          selected={location.pathname === "/pipelines"}
          onClick={() => navigate("/pipelines")}
        >
          <ListItemText primary="Pipelines" />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;