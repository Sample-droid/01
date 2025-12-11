import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton"; import EventJoin from "../Forms/Events/EventJoin/EventJoin";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import "./AdminPanel.css"; // separate CSS file (not included here)

const drawerWidth = 240;

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "users", label: "User Management", icon: <PeopleIcon /> },
  { id: "events", label: "Events", icon: <EventIcon /> },
  { id: "donation", label: "Donation", icon: <VolunteerActivismIcon /> },
];

function DashboardView() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">Quick stats and summaries go here.</Typography>
      
    </Box>
  );
}

function UserManagementView() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>
      <Typography variant="body1">List users, edit roles, deactivate accounts.</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Add New User
      </Button>
    </Box>
  );
}

function EventsView() {
  return (
    <Box>
     
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      <Typography variant="body1">Create, edit and manage events here.</Typography>
      <Button variant="outlined" sx={{ mt: 2 }}>
       
        Create Event
      </Button><br/><br/>
  

<Typography  variant="h5"> Ongoing Events <EventJoin/></Typography> </Box>
  );
}

function DonationView() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Donation
      </Typography>
      <Typography variant="body1">Manage donation campaigns and records.</Typography>
    </Box>
  );
}

export default function AdminPanel(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState("dashboard");

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <div className="admin-drawer">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={selected === item.id}
            onClick={() => {
              setSelected(item.id);
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption">Signed in as Admin</Typography>
      </Box>
    </div>
  );

  function renderContent() {
    switch (selected) {
      case "users":
        return <UserManagementView />;
      case "events":
        return <EventsView />;
      case "donation":
        return <DonationView />;
      default:
        return <DashboardView />;
    }
  }

  return (
    <Box sx={{ display: "flex" }} className="admin-panel-root">
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Permanent drawer on md+, temporary on smaller screens */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="admin navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Container maxWidth="lg">{renderContent()}</Container>
      </Box>
    </Box>
  );
}