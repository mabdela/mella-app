import React, { useState } from 'react';

import { Drawer, Box } from '@mui/material';

import NavDrawer from '../nav-drawer/nav-drawer';
import CommonAppBar from '@mono-repo/common/app-bar/app-bar';

const drawerWidth = 300;

const Navigation = props => {
  const { window } = props;
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', md: { width: drawerWidth } }}>
      <CommonAppBar click={toggleDrawer} text="Mella Super-Admin Panel" />

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { sm: 0 },
          height: '100vh',
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          anchor="left"
          open={showDrawer}
          onClose={toggleDrawer}
        >
          {<NavDrawer />}
        </Drawer>
        {/*  */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {<NavDrawer />}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navigation;
