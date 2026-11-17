import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            width: { md: `calc(100% - 260px)` },
            overflowX: 'hidden',
          }}
        >
          <Container maxWidth="xl" disableGutters>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
