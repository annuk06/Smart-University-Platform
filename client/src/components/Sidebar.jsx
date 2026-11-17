import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleIcon from '@mui/icons-material/People';
import DomainIcon from '@mui/icons-material/Domain';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260;

const getNavItems = (role) => {
  switch (role) {
    case 'admin':
      return [
        { label: 'Admin Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { label: 'Departments', icon: <DomainIcon />, path: '/dashboard/departments' },
        { label: 'All Courses', icon: <MenuBookIcon />, path: '/dashboard/courses' },
        { label: 'Faculty Directory', icon: <AssignmentIndIcon />, path: '/dashboard/faculty' },
        { label: 'Student Directory', icon: <PeopleIcon />, path: '/dashboard/students' },
        { label: 'Announcements', icon: <CampaignIcon />, path: '/dashboard/announcements' },
      ];
    case 'faculty':
      return [
        { label: 'Faculty Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { label: 'Assigned Courses', icon: <MenuBookIcon />, path: '/dashboard/courses' },
        { label: 'Students Roster', icon: <PeopleIcon />, path: '/dashboard/students' },
        { label: 'Campus Bulletins', icon: <CampaignIcon />, path: '/dashboard/announcements' },
      ];
    case 'student':
    default:
      return [
        { label: 'Student Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { label: 'My Enrolled Courses', icon: <MenuBookIcon />, path: '/dashboard/courses' },
        { label: 'Announcements', icon: <CampaignIcon />, path: '/dashboard/announcements' },
      ];
  }
};

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = getNavItems(user?.role);

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
      <Box sx={{ p: 2.5, display: { md: 'none' } }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e40af' }}>
          Smart University
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b' }}>
          Portal Navigation
        </Typography>
      </Box>

      <Box sx={{ px: 2, py: 2 }}>
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            fontWeight: 700,
            color: '#94a3b8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
        >
          {user?.role ? `${user.role} workspace` : 'Menu'}
        </Typography>
      </Box>

      <List sx={{ px: 1.5 }}>
        {navItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (mobileOpen && onMobileClose) onMobileClose();
                }}
                selected={isSelected}
                sx={{
                  borderRadius: 2,
                  py: 1.1,
                  px: 1.8,
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    backgroundColor: '#eff6ff',
                    color: '#1d4ed8',
                    fontWeight: 600,
                    '& .MuiListItemIcon-root': {
                      color: '#1d4ed8',
                    },
                    '&:hover': {
                      backgroundColor: '#dbeafe',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 38,
                    color: isSelected ? '#1d4ed8' : '#64748b',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.88rem',
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? '#1d4ed8' : '#334155',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1px solid #e2e8f0',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.82rem' }}>
            Academic Session
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 0.3 }}>
            2025 – 2026 (Semester 2)
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid #e2e8f0',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid #e2e8f0',
            top: '64px',
            height: 'calc(100vh - 64px)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
