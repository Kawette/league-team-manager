import { FunctionComponent } from "react";
import React, { createContext } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import Store from "electron-store";

// LCU Context
interface LCUCredentials {
  address: string;
  port: number;
  username: string;
  password: string;
  protocol: string;
}

const drawerWidth = 240;
interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {

  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    const store = new Store({ watch: true });

    const credentials = store.get('lcu.credentials');
    setCredentials(credentials);

    store.onDidChange('lcu.credentials', (credentials) => {
      console.log(`LCU credentials updated: ${JSON.stringify(credentials)}`);
      setCredentials(credentials ?? null);
    });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            League Team Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CircleIcon
                  fontSize="small"
                  color={!!credentials ? "success" : "error"}
                />
              </ListItemIcon>
              <ListItemText
                primary={`Client ${!!credentials ? "connecté" : "déconnecté"}`}
              />
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Paramètres" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
